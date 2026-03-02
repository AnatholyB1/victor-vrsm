import { useState } from "react";

export type ContactPayload = {
  nom: string;
  email: string;
  objectif: string;
  message: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

export function useContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string>("");

  const submit = async (payload: ContactPayload) => {
    const url = process.env.NEXT_PUBLIC_FORM_URL;

    if (!url) {
      setState("error");
      setError("NEXT_PUBLIC_FORM_URL est manquant.");
      return false;
    }

    try {
      setState("loading");
      setError("");

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