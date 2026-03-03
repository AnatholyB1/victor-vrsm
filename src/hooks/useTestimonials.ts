export interface Testimonial {
  id: string;
  avatar: string;
  name: string;
  result: string;
  text: string;
}

export const TESTIMONIALS_STORAGE_KEY = "admin_testimonials";

// Default testimonials to initialize storage
export const defaultTestimonials: Testimonial[] = [
  {
    id: "default-1",
    avatar: "JD",
    name: "Jean Dupont",
    result: "-15 kg en 3 mois",
    text: "Victor m'a aidé à transformer ma vie. Son approche personnalisée et son soutien constant ont été décisifs.",
  },
  {
    id: "default-2",
    avatar: "MB",
    name: "Marie Beaumont",
    result: "+8 kg de muscle",
    text: "Incroyable ! En 4 mois, j'ai gagné du muscle et perdu de la graisse. Victor sait vraiment ce qu'il fait.",
  },
  {
    id: "default-3",
    avatar: "PP",
    name: "Pierre Paulin",
    result: "Transformation complète",
    text: "Le meilleur investissement que j'ai pu faire. Victor change les vies, c'est un vrai champion.",
  },
];

// Initialize testimonials in localStorage if not present
export const initializeTestimonials = (): Testimonial[] => {
  if (typeof window === "undefined") return defaultTestimonials;
  
  const stored = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultTestimonials;
    }
  }
  
  // Initialize with defaults
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(defaultTestimonials));
  return defaultTestimonials;
};

// Get testimonials from storage
export const getTestimonials = (): Testimonial[] => {
  if (typeof window === "undefined") return defaultTestimonials;
  
  const stored = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultTestimonials;
    }
  }
  return defaultTestimonials;
};

// Save testimonials to storage
export const saveTestimonials = (testimonials: Testimonial[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
};
