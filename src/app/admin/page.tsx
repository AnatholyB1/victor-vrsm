"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

import { ContactMessage } from "@/hooks/useContactForm";
import { Testimonial, fetchTestimonials, addTestimonial, updateTestimonial, deleteTestimonialFromDb } from "@/hooks/useTestimonials";

// Client type
export interface Client {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  objectif: string;
  date_inscription: string;
  actif: boolean;
}

// Icons
const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const InboxIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"dashboard" | "messages" | "clients" | "testimonials">("dashboard");
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [clientForm, setClientForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    objectif: "",
    actif: true,
  });
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    avatar: "",
    result: "",
    text: "",
    photo_url: "",
  });
  const [testimonialPhotoFile, setTestimonialPhotoFile] = useState<File | null>(null);
  const [testimonialPhotoPreview, setTestimonialPhotoPreview] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const unreadCount = messages.filter((m) => !m.lu).length;

  // Load messages from Supabase on mount
  useEffect(() => {
    const loadMessages = async () => {
      const { data } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setMessages(data);
    };
    loadMessages();
  }, []);

  // Load clients from Supabase on mount
  useEffect(() => {
    const loadClients = async () => {
      const { data } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setClients(data);
    };
    loadClients();
  }, []);

  // Load testimonials from Supabase on mount
  useEffect(() => {
    const loadTestimonials = async () => {
      const data = await fetchTestimonials();
      setTestimonials(data);
    };
    loadTestimonials();
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const markAsRead = async (id: string) => {
    await supabase.from("contact_messages").update({ lu: true }).eq("id", id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, lu: true } : m))
    );
  };

  const deleteMessage = async (id: string) => {
    await supabase.from("contact_messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // Client CRUD operations
  const openAddClientModal = () => {
    setEditingClient(null);
    setClientForm({ nom: "", email: "", telephone: "", objectif: "", actif: true });
    setShowClientModal(true);
  };

  const openEditClientModal = (client: Client) => {
    setEditingClient(client);
    setClientForm({
      nom: client.nom,
      email: client.email,
      telephone: client.telephone,
      objectif: client.objectif,
      actif: client.actif,
    });
    setShowClientModal(true);
  };

  const closeClientModal = () => {
    setShowClientModal(false);
    setEditingClient(null);
    setClientForm({ nom: "", email: "", telephone: "", objectif: "", actif: true });
  };

  const saveClient = async () => {
    if (!clientForm.nom || !clientForm.email) return;

    if (editingClient) {
      // Edit existing client in Supabase
      await supabase
        .from("clients")
        .update({
          nom: clientForm.nom,
          email: clientForm.email,
          telephone: clientForm.telephone,
          objectif: clientForm.objectif,
          actif: clientForm.actif,
        })
        .eq("id", editingClient.id);
      
      setClients((prev) =>
        prev.map((c) =>
          c.id === editingClient.id
            ? { ...c, ...clientForm }
            : c
        )
      );
    } else {
      // Add new client to Supabase
      const { data: newClient } = await supabase
        .from("clients")
        .insert({
          nom: clientForm.nom,
          email: clientForm.email,
          telephone: clientForm.telephone,
          objectif: clientForm.objectif,
          date_inscription: new Date().toISOString().split("T")[0],
          actif: clientForm.actif,
        })
        .select()
        .single();
      
      if (newClient) {
        setClients((prev) => [newClient, ...prev]);
      }
    }
    closeClientModal();
  };

  const deleteClient = async (id: string) => {
    await supabase.from("clients").delete().eq("id", id);
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleClientStatus = async (id: string) => {
    const client = clients.find((c) => c.id === id);
    if (!client) return;
    
    await supabase.from("clients").update({ actif: !client.actif }).eq("id", id);
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, actif: !c.actif } : c))
    );
  };

  // Testimonial CRUD operations
  const openAddTestimonialModal = () => {
    setEditingTestimonial(null);
    setTestimonialForm({ name: "", avatar: "", result: "", text: "", photo_url: "" });
    setTestimonialPhotoFile(null);
    setTestimonialPhotoPreview(null);
    setShowTestimonialModal(true);
  };

  const openEditTestimonialModal = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialForm({
      name: testimonial.name,
      avatar: testimonial.avatar,
      result: testimonial.result,
      text: testimonial.text,
      photo_url: testimonial.photo_url ?? "",
    });
    setTestimonialPhotoFile(null);
    setTestimonialPhotoPreview(testimonial.photo_url ?? null);
    setShowTestimonialModal(true);
  };

  const closeTestimonialModal = () => {
    setShowTestimonialModal(false);
    setEditingTestimonial(null);
    setTestimonialForm({ name: "", avatar: "", result: "", text: "", photo_url: "" });
    setTestimonialPhotoFile(null);
    setTestimonialPhotoPreview(null);
  };

  const generateAvatar = (name: string): string => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const uploadTestimonialPhoto = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage
      .from("testimonial-photos")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });
    if (error) return null;
    const { data } = supabase.storage.from("testimonial-photos").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const deleteTestimonialPhoto = async (photoUrl: string) => {
    try {
      const parts = photoUrl.split("/testimonial-photos/");
      if (parts.length < 2) return;
      const fileName = parts[1];
      await supabase.storage.from("testimonial-photos").remove([fileName]);
    } catch {
      // silent fail
    }
  };

  const saveTestimonial = async () => {
    if (!testimonialForm.name || !testimonialForm.text) return;

    const avatar = testimonialForm.avatar || generateAvatar(testimonialForm.name);
    let photo_url = testimonialForm.photo_url;

    // Upload new photo if a file was selected
    if (testimonialPhotoFile) {
      setIsUploadingPhoto(true);
      const uploaded = await uploadTestimonialPhoto(testimonialPhotoFile);
      setIsUploadingPhoto(false);
      if (uploaded) {
        // Delete old photo if replacing
        if (editingTestimonial?.photo_url) {
          await deleteTestimonialPhoto(editingTestimonial.photo_url);
        }
        photo_url = uploaded;
      }
    }

    if (editingTestimonial) {
      const success = await updateTestimonial(editingTestimonial.id, {
        ...testimonialForm,
        avatar,
        photo_url: photo_url || undefined,
      });
      if (success) {
        setTestimonials((prev) =>
          prev.map((t) =>
            t.id === editingTestimonial.id
              ? { ...t, ...testimonialForm, avatar, photo_url: photo_url || undefined }
              : t
          )
        );
      }
    } else {
      const newTestimonial = await addTestimonial({
        name: testimonialForm.name,
        avatar,
        result: testimonialForm.result,
        text: testimonialForm.text,
        photo_url: photo_url || undefined,
      });
      if (newTestimonial) {
        setTestimonials((prev) => [newTestimonial, ...prev]);
      }
    }
    closeTestimonialModal();
  };

  const deleteTestimonial = async (id: string) => {
    const testimonial = testimonials.find((t) => t.id === id);
    if (testimonial?.photo_url) {
      await deleteTestimonialPhoto(testimonial.photo_url);
    }
    const success = await deleteTestimonialFromDb(id);
    if (success) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // Dashboard stats
  const activeClientsCount = clients.filter((c) => c.actif).length;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const newClientsThisMonth = clients.filter((c) => {
    const date = new Date(c.date_inscription);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  }).length;

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  // Show loading while checking auth
  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-lime-500 text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/10 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold gradient-text">Admin Panel</h1>
          <p className="text-gray-500 text-sm">{user?.nom || "Administrateur"}</p>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "dashboard"
                ? "gradient-bg text-black font-semibold"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <ChartIcon />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "messages"
                ? "gradient-bg text-black font-semibold"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <InboxIcon />
            Messages
            {unreadCount > 0 && (
              <span className="ml-auto bg-lime-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("clients")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "clients"
                ? "gradient-bg text-black font-semibold"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <UsersIcon />
            Clients
            {clients.length > 0 && (
              <span className="ml-auto bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {clients.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("testimonials")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "testimonials"
                ? "gradient-bg text-black font-semibold"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <StarIcon />
            Témoignages
            {testimonials.length > 0 && (
              <span className="ml-auto bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {testimonials.length}
              </span>
            )}
          </button>
        </nav>

        <div className="border-t border-white/10 pt-4 space-y-2">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <HomeIcon />
            Retour au site
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogoutIcon />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Dashboard</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="glass rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-1">Messages reçus</p>
                <p className="text-3xl font-bold gradient-text">{messages.length}</p>
              </div>

              <div className="glass rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-1">Non lus</p>
                <p className="text-3xl font-bold text-lime-500">{unreadCount}</p>
              </div>

              <div className="glass rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-1">Clients actifs</p>
                <p className="text-3xl font-bold gradient-text">{activeClientsCount}</p>
              </div>

              <div className="glass rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-1">Ce mois</p>
                <p className="text-3xl font-bold gradient-text">+{newClientsThisMonth}</p>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Messages récents</h3>
                <button
                  onClick={() => setActiveTab("messages")}
                  className="text-lime-500 hover:text-lime-400 text-sm font-medium"
                >
                  Voir tout →
                </button>
              </div>

              <div className="space-y-4">
                {messages.slice(0, 3).map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-xl border transition-all ${
                      msg.lu
                        ? "border-white/10 bg-white/5"
                        : "border-lime-500/30 bg-lime-500/5"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-white">{msg.nom}</p>
                        <p className="text-gray-500 text-sm">{msg.email}</p>
                      </div>
                      <span className="text-gray-500 text-xs">{msg.date}</span>
                    </div>
                    <p className="text-gray-400 mt-2 text-sm line-clamp-2">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Messages</h2>

            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <InboxIcon />
                  <p className="text-gray-400 mt-4">Aucun message</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`glass rounded-2xl p-6 transition-all ${
                      !msg.lu ? "border border-lime-500/30" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="font-semibold text-white text-lg">{msg.nom}</p>
                          {!msg.lu && (
                            <span className="bg-lime-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                              Nouveau
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500">{msg.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-sm">{msg.date}</p>
                        <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium bg-lime-500/20 text-lime-500">
                          {msg.objectif}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{msg.message}</p>

                    <div className="flex gap-3">
                      <a
                        href={`mailto:${msg.email}`}
                        className="px-4 py-2 rounded-lg gradient-bg text-black font-semibold text-sm hover:opacity-90 transition-opacity"
                      >
                        Répondre
                      </a>
                      {!msg.lu && (
                        <button
                          onClick={() => markAsRead(msg.id)}
                          className="px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                        >
                          Marquer comme lu
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "clients" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Clients</h2>
              <button
                onClick={openAddClientModal}
                className="flex items-center gap-2 gradient-bg text-black font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
              >
                <PlusIcon />
                Ajouter un client
              </button>
            </div>

            <div className="space-y-4">
              {clients.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <UsersIcon />
                  <p className="text-gray-400 mt-4">Aucun client</p>
                  <button
                    onClick={openAddClientModal}
                    className="mt-4 text-lime-500 hover:text-lime-400 font-medium"
                  >
                    Ajouter votre premier client
                  </button>
                </div>
              ) : (
                clients.map((client) => (
                  <div
                    key={client.id}
                    className={`glass rounded-2xl p-6 transition-all ${
                      client.actif ? "" : "opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="font-semibold text-white text-lg">{client.nom}</p>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              client.actif
                                ? "bg-lime-500 text-black"
                                : "bg-gray-500 text-white"
                            }`}
                          >
                            {client.actif ? "Actif" : "Inactif"}
                          </span>
                        </div>
                        <p className="text-gray-500">{client.email}</p>
                        {client.telephone && (
                          <p className="text-gray-500 text-sm">{client.telephone}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-sm">Inscrit le {client.date_inscription}</p>
                        {client.objectif && (
                          <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium bg-lime-500/20 text-lime-500">
                            {client.objectif}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={`mailto:${client.email}`}
                        className="px-4 py-2 rounded-lg gradient-bg text-black font-semibold text-sm hover:opacity-90 transition-opacity"
                      >
                        Contacter
                      </a>
                      <button
                        onClick={() => openEditClientModal(client)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                      >
                        <EditIcon />
                        Modifier
                      </button>
                      <button
                        onClick={() => toggleClientStatus(client.id)}
                        className="px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                      >
                        {client.actif ? "Désactiver" : "Activer"}
                      </button>
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "testimonials" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Témoignages</h2>
              <button
                onClick={openAddTestimonialModal}
                className="flex items-center gap-2 gradient-bg text-black font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
              >
                <PlusIcon />
                Ajouter un témoignage
              </button>
            </div>

            <div className="space-y-4">
              {testimonials.length === 0 ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <StarIcon />
                  <p className="text-gray-400 mt-4">Aucun témoignage</p>
                  <button
                    onClick={openAddTestimonialModal}
                    className="mt-4 text-lime-500 hover:text-lime-400 font-medium"
                  >
                    Ajouter votre premier témoignage
                  </button>
                </div>
              ) : (
                testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="glass rounded-2xl p-6 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-black font-bold">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-white text-lg">{testimonial.name}</p>
                          <p className="text-lime-500 text-sm font-medium">{testimonial.result}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>

                    {/* Photo thumbnail */}
                    {testimonial.photo_url && (
                      <div className="mb-4 w-full max-w-xs h-36 rounded-xl overflow-hidden border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={testimonial.photo_url}
                          alt={`Photo de ${testimonial.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditTestimonialModal(testimonial)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                      >
                        <EditIcon />
                        Modifier
                      </button>
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 text-sm hover:bg-red-500/10 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* Client Modal */}
      {showClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={closeClientModal}
          />
          <div className="relative glass rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingClient ? "Modifier le client" : "Ajouter un client"}
              </h3>
              <button
                onClick={closeClientModal}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <CloseIcon />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveClient();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-300 mb-2">Nom complet *</label>
                <input
                  type="text"
                  value={clientForm.nom}
                  onChange={(e) => setClientForm({ ...clientForm, nom: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="Jean Dupont"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  value={clientForm.email}
                  onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="jean@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={clientForm.telephone}
                  onChange={(e) => setClientForm({ ...clientForm, telephone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div>
                <label htmlFor="objectif-select" className="block text-gray-300 mb-2">Objectif</label>
                <select
                  id="objectif-select"
                  value={clientForm.objectif}
                  onChange={(e) => setClientForm({ ...clientForm, objectif: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-lime-500 transition-colors"
                >
                  <option value="" className="bg-gray-900">Sélectionner</option>
                  <option value="Perte de poids" className="bg-gray-900">Perte de poids</option>
                  <option value="Prise de masse" className="bg-gray-900">Prise de masse</option>
                  <option value="Transformation complète" className="bg-gray-900">Transformation complète</option>
                  <option value="Remise en forme" className="bg-gray-900">Remise en forme</option>
                  <option value="Autre" className="bg-gray-900">Autre</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="actif"
                  checked={clientForm.actif}
                  onChange={(e) => setClientForm({ ...clientForm, actif: e.target.checked })}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-lime-500 focus:ring-lime-500"
                />
                <label htmlFor="actif" className="text-gray-300">Client actif</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeClientModal}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/20 text-gray-300 font-medium hover:bg-white/5 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 gradient-bg text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  {editingClient ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonial Modal */}
      {showTestimonialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={closeTestimonialModal}
          />
          <div className="relative glass rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingTestimonial ? "Modifier le témoignage" : "Ajouter un témoignage"}
              </h3>
              <button
                onClick={closeTestimonialModal}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <CloseIcon />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveTestimonial();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-300 mb-2">Nom complet *</label>
                <input
                  type="text"
                  value={testimonialForm.name}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="Jean Dupont"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Avatar (initiales)</label>
                <input
                  type="text"
                  value={testimonialForm.avatar}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value.toUpperCase().slice(0, 2) })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="JD (généré automatiquement si vide)"
                  maxLength={2}
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Résultat obtenu *</label>
                <input
                  type="text"
                  value={testimonialForm.result}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, result: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
                  placeholder="-15 kg en 3 mois"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Témoignage *</label>
                <textarea
                  value={testimonialForm.text}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors resize-none"
                  placeholder="Victor m'a aidé à transformer ma vie..."
                  rows={4}
                  required
                />
              </div>

              {/* Photo upload */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Photo de transformation
                  <span className="text-gray-500 font-normal ml-1">(optionnel)</span>
                </label>

                {/* Preview */}
                {testimonialPhotoPreview && (
                  <div className="relative mb-3 w-full h-40 rounded-xl overflow-hidden border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={testimonialPhotoPreview}
                      alt="Aperçu"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setTestimonialPhotoPreview(null);
                        setTestimonialPhotoFile(null);
                        setTestimonialForm({ ...testimonialForm, photo_url: "" });
                      }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-red-500/80 transition-colors"
                      aria-label="Supprimer la photo"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <label className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-white/5 border border-dashed border-white/20 text-gray-400 hover:border-lime-500 hover:text-lime-500 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">
                    {testimonialPhotoFile ? testimonialPhotoFile.name : "Choisir une photo (JPG, PNG, WEBP)"}
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 5 * 1024 * 1024) {
                        alert("La photo ne doit pas dépasser 5 Mo.");
                        return;
                      }
                      setTestimonialPhotoFile(file);
                      const reader = new FileReader();
                      reader.onload = (ev) => setTestimonialPhotoPreview(ev.target?.result as string);
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
                <p className="text-gray-600 text-xs mt-1">Max 5 Mo – JPG, PNG ou WEBP</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeTestimonialModal}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/20 text-gray-300 font-medium hover:bg-white/5 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isUploadingPhoto}
                  className="flex-1 gradient-bg text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {isUploadingPhoto ? "Upload en cours..." : editingTestimonial ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
