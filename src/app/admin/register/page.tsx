"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function AdminRegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);

    const result = await register(nom, email, password);

    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error || "Erreur lors de l'inscription");
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-lime-500 text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-8">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 via-transparent to-cyan-500/10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="glass rounded-3xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <Image
                src="/logo.jpg"
                alt="Logo Victor Verissimo"
                width={48}
                height={48}
                className="rounded-full border border-white/20"
              />
              <span className="text-2xl font-bold gradient-text">ADMIN</span>
            </Link>
            <h1 className="text-2xl font-bold text-white">Créer un compte</h1>
            <p className="text-gray-400 mt-2">Inscrivez-vous pour accéder à l&apos;administration</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nom" className="block text-gray-300 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
                placeholder="Victor Verissimo"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
                placeholder="admin@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
                placeholder="••••••••"
                minLength={6}
                required
              />
              <p className="text-gray-500 text-xs mt-1">Minimum 6 caractères</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-bg text-black font-bold py-4 rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
            >
              {isLoading ? "Création..." : "Créer mon compte"}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Déjà un compte ?{" "}
              <Link href="/admin/login" className="text-lime-500 hover:text-lime-400 font-medium">
                Se connecter
              </Link>
            </p>
          </div>

          {/* Back to site */}
          <div className="mt-4 text-center">
            <Link href="/" className="text-gray-500 hover:text-gray-400 text-sm">
              ← Retour au site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
