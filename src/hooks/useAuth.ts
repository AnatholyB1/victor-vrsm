"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, DbAdminUser } from "@/lib/supabase";

interface User {
  id: string;
  email: string;
  nom: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const SESSION_KEY = "admin_session";

// Simple hash function - in production use bcrypt on server
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (sessionData) {
        try {
          const user = JSON.parse(sessionData) as User;
          // Verify user still exists in database
          const { data } = await supabase
            .from("admin_users")
            .select("id, email, nom")
            .eq("id", user.id)
            .single();

          if (data) {
            setState({ user: data, isLoading: false, isAuthenticated: true });
          } else {
            localStorage.removeItem(SESSION_KEY);
            setState({ user: null, isLoading: false, isAuthenticated: false });
          }
        } catch {
          localStorage.removeItem(SESSION_KEY);
          setState({ user: null, isLoading: false, isAuthenticated: false });
        }
      } else {
        setState({ user: null, isLoading: false, isAuthenticated: false });
      }
    };

    checkSession();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data: user, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email.toLowerCase())
        .single();

      if (error || !user) {
        return { success: false, error: "Aucun compte trouvé avec cet email" };
      }

      const typedUser = user as DbAdminUser;

      if (typedUser.password_hash !== simpleHash(password)) {
        return { success: false, error: "Mot de passe incorrect" };
      }

      const sessionUser: User = { id: typedUser.id, email: typedUser.email, nom: typedUser.nom };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      setState({ user: sessionUser, isLoading: false, isAuthenticated: true });

      return { success: true };
    } catch (err) {
      return { success: false, error: "Erreur de connexion" };
    }
  }, []);

  const register = useCallback(async (
    nom: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (password.length < 6) {
      return { success: false, error: "Le mot de passe doit contenir au moins 6 caractères" };
    }

    try {
      // Check if user already exists
      const { data: existing } = await supabase
        .from("admin_users")
        .select("id")
        .eq("email", email.toLowerCase())
        .single();

      if (existing) {
        return { success: false, error: "Un compte existe déjà avec cet email" };
      }

      // Create new user
      const { data: newUser, error } = await supabase
        .from("admin_users")
        .insert({
          email: email.toLowerCase(),
          nom,
          password_hash: simpleHash(password),
        })
        .select()
        .single();

      if (error || !newUser) {
        return { success: false, error: "Erreur lors de la création du compte" };
      }

      const sessionUser: User = { id: newUser.id, email: newUser.email, nom: newUser.nom };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
      setState({ user: sessionUser, isLoading: false, isAuthenticated: true });

      return { success: true };
    } catch (err) {
      return { success: false, error: "Erreur lors de l'inscription" };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setState({ user: null, isLoading: false, isAuthenticated: false });
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
  };
}
