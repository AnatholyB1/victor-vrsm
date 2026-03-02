"use client";

import { useState } from "react";
import Script from "next/script";

// Icons as simple SVG components
const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const DumbbellIcon = () => (
  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z"/>
  </svg>
);

const TargetIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const services = [
    {
      icon: <DumbbellIcon />,
      title: "Transformation Physique",
      description: "Programme personnalisé pour sculpter votre corps et atteindre vos objectifs, adapté à votre niveau.",
    },
    {
      icon: <TargetIcon />,
      title: "Coaching Personnalisé",
      description: "Suivi individuel avec des exercices adaptés à vos capacités et votre emploi du temps.",
    },
    {
      icon: <HeartIcon />,
      title: "Nutrition & Bien-être",
      description: "Conseils nutritionnels pour optimiser vos résultats et améliorer votre santé globale.",
    },
    {
      icon: <TrendingUpIcon />,
      title: "Suivi de Progression",
      description: "Mesures régulières et ajustements pour garantir une progression constante.",
    },
  ];

  const testimonials = [
    {
      name: "Marie L.",
      result: "-15kg en 4 mois",
      text: "Victor m'a accompagnée tout au long de ma transformation. Son approche bienveillante et ses conseils m'ont permis d'atteindre mes objectifs sans jamais me sentir dépassée.",
      avatar: "M",
    },
    {
      name: "Thomas D.",
      result: "+8kg de muscle",
      text: "En tant que débutant, j'avais peur de ne pas être à la hauteur. Victor a su adapter chaque séance à mon niveau et me faire progresser sereinement.",
      avatar: "T",
    },
    {
      name: "Sophie R.",
      result: "Transformation complète",
      text: "Le meilleur investissement que j'ai fait pour ma santé. Victor est un coach exceptionnel qui s'adapte vraiment à chaque personne.",
      avatar: "S",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Victor Verissimo Coaching",
    description:
      "Coaching sportif personnalisé pour transformation physique, perte de poids et prise de masse.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
    sameAs: ["https://instagram.com/victor_vrsm"],
    telephone: "+33 6 35 59 31 64",
    email: "vverissimo.victor@gmail.com",
    areaServed: "FR",
    inLanguage: "fr-FR",
  };

  return (
    <>
      <Script
        id="schema-pro-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#0a0a0a]">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="#" className="text-2xl font-bold gradient-text">
                VICTOR VERISSIMO
              </a>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#about" className="text-gray-300 hover:text-lime-500 transition-colors">
                  À propos
                </a>
                <a href="#services" className="text-gray-300 hover:text-lime-500 transition-colors">
                  Services
                </a>
                <a href="#results" className="text-gray-300 hover:text-lime-500 transition-colors">
                  Résultats
                </a>
                <a
                  href="#contact"
                  className="gradient-bg text-black font-semibold px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  Contact
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden glass border-t border-white/10">
              <div className="px-4 py-4 space-y-4">
                <a href="#about" className="block text-gray-300 hover:text-lime-500" onClick={() => setMenuOpen(false)}>
                  À propos
                </a>
                <a href="#services" className="block text-gray-300 hover:text-lime-500" onClick={() => setMenuOpen(false)}>
                  Services
                </a>
                <a href="#results" className="block text-gray-300 hover:text-lime-500" onClick={() => setMenuOpen(false)}>
                  Résultats
                </a>
                <a
                  href="#contact"
                  className="block gradient-bg text-black font-semibold px-6 py-2 rounded-full text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 via-transparent to-cyan-500/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-float">
              <span className="inline-block px-4 py-2 rounded-full glass text-lime-500 text-sm font-medium mb-6">
                Coach Sportif Certifié
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">Transformez</span>
              <br />
              <span className="gradient-text">Votre Corps</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8">
              Coaching personnalisé accessible à tous. Que vous soyez débutant ou confirmé,
              atteignez vos objectifs avec un accompagnement sur-mesure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#contact"
                className="gradient-bg text-black font-bold px-8 py-4 rounded-full text-lg hover:opacity-90 transition-all hover:scale-105"
              >
                Commencer Ma Transformation
              </a>
              <a
                href="#services"
                className="glass text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-all"
              >
                Découvrir les Services
              </a>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8 text-center">
              <div>
                <p className="text-4xl font-bold gradient-text">500+</p>
                <p className="text-gray-400">Clients Transformés</p>
              </div>
              <div>
                <p className="text-4xl font-bold gradient-text">5 ans</p>
                <p className="text-gray-400">D&apos;Expérience</p>
              </div>
              <div>
                <p className="text-4xl font-bold gradient-text">98%</p>
                <p className="text-gray-400">De Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative w-full max-w-sm mx-auto md:mx-0">
                <div className="aspect-square rounded-2xl overflow-hidden glass p-2">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-lime-500/30 to-cyan-500/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-lime-500 to-cyan-500 flex items-center justify-center text-6xl font-bold text-black">
                        VV
                      </div>
                      <p className="mt-4 text-xl font-semibold text-white">Victor Verissimo</p>
                      <p className="text-lime-500">@victor_vrsm</p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-4 w-24 h-24 gradient-bg rounded-2xl flex items-center justify-center"
                >
                  <DumbbellIcon />
                </div>
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-white">Votre Coach</span>
                  <br />
                  <span className="gradient-text">Victor Verissimo</span>
                </h2>

                <p className="text-gray-400 text-lg mb-6">
                  Passionné par le sport et la transformation physique depuis toujours,
                  je me suis spécialisé dans l&apos;accompagnement des personnes souhaitant
                  reprendre leur corps en main.
                </p>

                <p className="text-gray-400 text-lg mb-8">
                  Ma philosophie ? <span className="text-lime-500 font-semibold">Tout le monde peut y arriver.</span> Que vous n&apos;ayez
                  jamais mis les pieds dans une salle ou que vous cherchiez à passer au
                  niveau supérieur, je m&apos;adapte à VOUS.
                </p>

                <div className="space-y-4">
                  {["Programmes adaptés aux débutants", "Suivi personnalisé et bienveillant", "Résultats visibles et durables", "Conseils nutrition inclus"].map((item, index) => (
                    <div key={index} className="flex items-center justify-center md:justify-start gap-3">
                      <CheckIcon />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://instagram.com/victor_vrsm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 text-lime-500 hover:text-lime-400 transition-colors"
                >
                  <InstagramIcon />
                  <span>Suivez-moi sur Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-500/5 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-white">Mes </span>
                <span className="gradient-text">Services</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Un accompagnement complet pour vous aider à atteindre vos objectifs,
                quel que soit votre point de départ.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-6 hover-lift cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center mb-4 text-black group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 glass rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Prêt à commencer votre transformation ?
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Première consultation gratuite pour discuter de vos objectifs
                    et établir un plan d&apos;action personnalisé.
                  </p>
                  <a
                    href="#contact"
                    className="inline-block gradient-bg text-black font-bold px-8 py-4 rounded-full hover:opacity-90 transition-all hover:scale-105"
                  >
                    Réserver un Appel Gratuit
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold gradient-text">24/7</p>
                    <p className="text-gray-400 text-sm">Support disponible</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold gradient-text">100%</p>
                    <p className="text-gray-400 text-sm">Personnalisé</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold gradient-text">0</p>
                    <p className="text-gray-400 text-sm">Engagement</p>
                  </div>
                  <div className="glass rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold gradient-text">∞</p>
                    <p className="text-gray-400 text-sm">Motivation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results/Testimonials Section */}
        <section id="results" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-white">Ils ont </span>
                <span className="gradient-text">Réussi</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Découvrez les témoignages de ceux qui ont transformé leur vie avec mon accompagnement.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-6 hover-lift"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-black font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-lime-500 text-sm font-medium">{testimonial.result}</p>
                    </div>
                  </div>
                  <p className="text-gray-400">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="mt-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-lime-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="text-white">Contactez</span>
                    <br />
                    <span className="gradient-text">Victor</span>
                  </h2>
                  <p className="text-gray-400 text-lg mb-8">
                    Prêt à transformer votre corps ? Contactez-moi pour discuter
                    de vos objectifs et commencer votre parcours.
                  </p>

                  <div className="space-y-6">
                    <a
                      href="tel:0635593164"
                      className="flex items-center gap-4 text-gray-300 hover:text-lime-500 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-lime-500/20 transition-colors">
                        <PhoneIcon />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Téléphone</p>
                        <p className="font-semibold">06 35 59 31 64</p>
                      </div>
                    </a>

                    <a
                      href="mailto:vverissimo.victor@gmail.com"
                      className="flex items-center gap-4 text-gray-300 hover:text-lime-500 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-lime-500/20 transition-colors">
                        <EmailIcon />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold">vverissimo.victor@gmail.com</p>
                      </div>
                    </a>

                    <a
                      href="https://instagram.com/victor_vrsm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-gray-300 hover:text-lime-500 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl glass flex items-center justify-center group-hover:bg-lime-500/20 transition-colors">
                        <InstagramIcon />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Instagram</p>
                        <p className="font-semibold">@victor_vrsm</p>
                      </div>
                    </a>
                  </div>
                </div>

                <div>
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="goal" className="block text-gray-300 mb-2">
                        Votre objectif
                      </label>
                      <select
                        id="goal"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-lime-500 transition-colors"
                      >
                        <option value="" className="bg-gray-900">
                          Sélectionnez votre objectif
                        </option>
                        <option value="weight-loss" className="bg-gray-900">
                          Perte de poids
                        </option>
                        <option value="muscle-gain" className="bg-gray-900">
                          Prise de masse
                        </option>
                        <option value="transformation" className="bg-gray-900">
                          Transformation complète
                        </option>
                        <option value="fitness" className="bg-gray-900">
                          Remise en forme
                        </option>
                        <option value="other" className="bg-gray-900">
                          Autre
                        </option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors resize-none"
                        placeholder="Parlez-moi de votre situation et de vos objectifs..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full gradient-bg text-black font-bold py-4 rounded-xl hover:opacity-90 transition-all hover:scale-[1.02]"
                    >
                      Envoyer le Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-14 border-t border-white/10 bg-black/20">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 text-center md:text-left">
              <div className="md:col-span-2 flex flex-col items-center md:items-start">
                <a href="#" className="text-2xl font-bold gradient-text">
                  VICTOR VERISSIMO
                </a>
                <p className="text-gray-400 mt-4 max-w-md leading-relaxed">
                  Coach sportif spécialisé en transformation physique.
                  Accompagnement personnalisé pour tous les niveaux.
                </p>
                <div className="flex gap-4 mt-6 justify-center md:justify-start">
                  <a
                    href="https://instagram.com/victor_vrsm"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-lime-500 hover:bg-lime-500/20 transition-all"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <h4 className="font-semibold text-white mb-4">Navigation</h4>
                <ul className="space-y-2">
                  <li><a href="#about" className="text-gray-400 hover:text-lime-500 transition-colors">À propos</a></li>
                  <li><a href="#services" className="text-gray-400 hover:text-lime-500 transition-colors">Services</a></li>
                  <li><a href="#results" className="text-gray-400 hover:text-lime-500 transition-colors">Résultats</a></li>
                  <li><a href="#contact" className="text-gray-400 hover:text-lime-500 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Victor Verissimo. Tous droits réservés.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <p className="text-gray-500 text-sm">Coach sportif certifié</p>
                <span className="hidden sm:inline text-gray-700">•</span>
                <a
                  href="https://selenium-studio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 text-sm hover:text-lime-500 transition-colors"
                >
                  Site créé par selenium-studio.com
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
