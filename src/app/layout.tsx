import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: {
    default: "Victor Verissimo | Coach Sportif Transformation Physique",
    template: "%s | Victor Verissimo",
  },
  description:
    "Coach sportif spécialisé en transformation physique. Programmes personnalisés, suivi nutritionnel et accompagnement complet pour des résultats durables.",
  keywords: [
    "coach sportif",
    "transformation physique",
    "perte de poids",
    "prise de masse",
    "coaching sportif personnalisé",
    "suivi nutritionnel",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: "Victor Verissimo | Coach Sportif Transformation Physique",
    description:
      "Programmes personnalisés, suivi régulier et méthode durable pour transformer votre physique.",
    siteName: "Victor Verissimo Coaching",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Verissimo | Coach Sportif",
    description:
      "Transformez votre physique avec un accompagnement personnalisé.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
