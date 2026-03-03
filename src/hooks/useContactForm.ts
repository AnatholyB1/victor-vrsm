import { useState } from "react";
import { supabase } from "@/lib/supabase";

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

type SubmitState = "idle" | "loading" | "success" | "error";

// Save message to Supabase
const saveMessageToSupabase = async (payload: ContactPayload): Promise<boolean> => {
  const { error } = await supabase
    .from("contact_messages")
    .insert({
      nom: payload.nom,
      email: payload.email,
      objectif: payload.objectif,
      message: payload.message,
      date: new Date().toISOString().split("T")[0],
      lu: false,
    });

  return !error;
};

export function useContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string>("");

  const submit = async (payload: ContactPayload) => {
    const url = process.env.NEXT_PUBLIC_FORM_URL;

    try {
      setState("loading");
      setError("");

      // Save to Supabase
      const saved = await saveMessageToSupabase(payload);
      if (!saved) {
        throw new Error("Failed to save to database");
      }

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