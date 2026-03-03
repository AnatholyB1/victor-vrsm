import { useState } from "react";

export type ContactPayload = {
  nom: string;
  email: string;
  objectif: string;
  message: string;
};

export type ContactMessage = {
  id: string;
  nom: string;
  email: string;
  objectif: string;
  message: string;
  date: string;
  lu: boolean;
};

export const MESSAGES_STORAGE_KEY = "admin_contact_messages";

type SubmitState = "idle" | "loading" | "success" | "error";

// Save message to localStorage for admin panel
const saveMessageToStorage = (payload: ContactPayload) => {
  const newMessage: ContactMessage = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2),
    nom: payload.nom,
    email: payload.email,
    objectif: payload.objectif,
    message: payload.message,
    date: new Date().toISOString().split("T")[0],
    lu: false,
  };

  const existingRaw = localStorage.getItem(MESSAGES_STORAGE_KEY);
  const existing: ContactMessage[] = existingRaw ? JSON.parse(existingRaw) : [];
  existing.unshift(newMessage);
  localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(existing));
};

export function useContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string>("");

  const submit = async (payload: ContactPayload) => {
    const url = process.env.NEXT_PUBLIC_FORM_URL;

    try {
      setState("loading");
      setError("");

      // Always save to localStorage for admin panel
      saveMessageToStorage(payload);

      // If external URL is configured, also send there
      if (url) {
        const res = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom: payload.nom,
            email: payload.email,
            objectif: payload.objectif,
            message: payload.message,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
      }

      setState("success");
      return true;
    } catch (e) {
      setState("error");
      setError("Envoi impossible. Réessaie.");
      return false;
    }
  };

  return {
    submit,
    state,
    error,
    isLoading: state === "loading",
    isSuccess: state === "success",
    isError: state === "error",
  };
}