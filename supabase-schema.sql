-- Victor Verissimo Admin - Supabase Schema
-- Execute this SQL in your Supabase SQL Editor

-- Table des messages de contact
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  objectif TEXT,
  message TEXT NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  lu BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des clients
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT,
  objectif TEXT,
  date_inscription DATE DEFAULT CURRENT_DATE,
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des témoignages
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  avatar TEXT NOT NULL,
  name TEXT NOT NULL,
  result TEXT NOT NULL,
  text TEXT NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ajouter photo_url sur une base existante (ignorer si déjà fait)
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Storage bucket pour les photos de témoignages
-- À créer via le dashboard Supabase > Storage > New bucket
-- Nom : testimonial-photos  |  Public : true
-- Ou via SQL (extension pgsodium requise sur certains plans) :
-- INSERT INTO storage.buckets (id, name, public) VALUES ('testimonial-photos', 'testimonial-photos', true) ON CONFLICT DO NOTHING;

-- Table des utilisateurs admin
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insérer les témoignages par défaut
INSERT INTO testimonials (id, avatar, name, result, text) VALUES
  ('00000000-0000-0000-0000-000000000001', 'JD', 'Jean Dupont', '-15 kg en 3 mois', 'Victor m''a aidé à transformer ma vie. Son approche personnalisée et son soutien constant ont été décisifs.'),
  ('00000000-0000-0000-0000-000000000002', 'MB', 'Marie Beaumont', '+8 kg de muscle', 'Incroyable ! En 4 mois, j''ai gagné du muscle et perdu de la graisse. Victor sait vraiment ce qu''il fait.'),
  ('00000000-0000-0000-0000-000000000003', 'PP', 'Pierre Paulin', 'Transformation complète', 'Le meilleur investissement que j''ai pu faire. Victor change les vies, c''est un vrai champion.')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security (optionnel mais recommandé)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies pour permettre l'accès public en lecture aux témoignages
CREATE POLICY "Allow public read access to testimonials" ON testimonials
  FOR SELECT USING (true);

-- Policies pour permettre toutes les opérations avec la clé anon (pour l'admin)
-- Note: En production, vous devriez utiliser une authentification plus stricte

CREATE POLICY "Allow all operations on contact_messages" ON contact_messages
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on clients" ON clients
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on testimonials" ON testimonials
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on admin_users" ON admin_users
  FOR ALL USING (true) WITH CHECK (true);
