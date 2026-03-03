"use client";

import { useState, useEffect, useCallback } from "react";

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

const STORAGE_KEY = "admin_auth";
const USERS_KEY = "admin_users";

// Simple hash function for demo purposes
// In production, use a proper backend with bcrypt
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
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const user = JSON.parse(stored) as User;
        setState({ user, isLoading: false, isAuthenticated: true });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setState({ user: null, isLoading: false, isAuthenticated: false });
      }
    } else {
      setState({ user: null, isLoading: false, isAuthenticated: false });
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const usersRaw = localStorage.getItem(USERS_KEY);
    const users: Array<{ id: string; email: string; nom: string; passwordHash: string }> = usersRaw ? JSON.parse(usersRaw) : [];

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, error: "Aucun compte trouvé avec cet email" };
    }

    if (user.passwordHash !== simpleHash(password)) {
      return { success: false, error: "Mot de passe incorrect" };
    }

    const sessionUser: User = { id: user.id, email: user.email, nom: user.nom };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    setState({ user: sessionUser, isLoading: false, isAuthenticated: true });

    return { success: true };
  }, []);

  const register = useCallback(async (
    nom: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (password.length < 6) {
      return { success: false, error: "Le mot de passe doit contenir au moins 6 caractères" };
    }

    const usersRaw = localStorage.getItem(USERS_KEY);
    const users: Array<{ id: string; email: string; nom: string; passwordHash: string }> = usersRaw ? JSON.parse(usersRaw) : [];

    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return { success: false, error: "Un compte existe déjà avec cet email" };
    }

    const newUser = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      email,
      nom,
      passwordHash: simpleHash(password),
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const sessionUser: User = { id: newUser.id, email: newUser.email, nom: newUser.nom };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    setState({ user: sessionUser, isLoading: false, isAuthenticated: true });

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, isLoading: false, isAuthenticated: false });
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
  };
}
