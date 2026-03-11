import { supabase } from "@/lib/supabase";

export interface Testimonial {
  id: string;
  avatar: string;
  name: string;
  result: string;
  text: string;
  photo_url?: string;
}

// Default testimonials for SSR/initial render
export const defaultTestimonials: Testimonial[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    avatar: "JD",
    name: "Jean Dupont",
    result: "-15 kg en 3 mois",
    text: "Victor m'a aidé à transformer ma vie. Son approche personnalisée et son soutien constant ont été décisifs.",
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    avatar: "MB",
    name: "Marie Beaumont",
    result: "+8 kg de muscle",
    text: "Incroyable ! En 4 mois, j'ai gagné du muscle et perdu de la graisse. Victor sait vraiment ce qu'il fait.",
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    avatar: "PP",
    name: "Pierre Paulin",
    result: "Transformation complète",
    text: "Le meilleur investissement que j'ai pu faire. Victor change les vies, c'est un vrai champion.",
  },
];

// Fetch testimonials from Supabase
export const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return defaultTestimonials;
  }

  return data;
};

// Add a new testimonial
export const addTestimonial = async (testimonial: Omit<Testimonial, "id">): Promise<Testimonial | null> => {
  const { data, error } = await supabase
    .from("testimonials")
    .insert(testimonial)
    .select()
    .single();

  if (error) return null;
  return data;
};

// Update a testimonial
export const updateTestimonial = async (id: string, updates: Partial<Omit<Testimonial, "id">>): Promise<boolean> => {
  const { error } = await supabase
    .from("testimonials")
    .update(updates)
    .eq("id", id);

  return !error;
};

// Delete a testimonial
export const deleteTestimonialFromDb = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);

  return !error;
};

// Initialize testimonials - for backward compatibility
export const initializeTestimonials = (): Testimonial[] => {
  return defaultTestimonials;
};
