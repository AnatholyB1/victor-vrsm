import { createClient } from "@/utils/supabase/client";

// Client singleton for browser-side usage
export const supabase = createClient();

// Re-export the createClient function for direct usage
export { createClient } from "@/utils/supabase/client";

// Database types
export interface DbContactMessage {
  id: string;
  nom: string;
  email: string;
  objectif: string;
  message: string;
  date: string;
  lu: boolean;
  created_at?: string;
}

export interface DbClient {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  objectif: string;
  date_inscription: string;
  actif: boolean;
  created_at?: string;
}

export interface DbTestimonial {
  id: string;
  avatar: string;
  name: string;
  result: string;
  text: string;
  created_at?: string;
}

export interface DbAdminUser {
  id: string;
  email: string;
  nom: string;
  password_hash: string;
  created_at?: string;
}
