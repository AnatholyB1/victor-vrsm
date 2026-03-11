import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site victorverissimo.com – informations légales, politique de confidentialité et gestion des données personnelles.",
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Logo Victor Verissimo"
                width={40}
                height={40}
                className="rounded-full border border-white/20"
                priority
              />
              <span className="text-2xl font-bold gradient-text">VICTOR VERISSIMO</span>
            </Link>
            <Link
              href="/#contact"
              className="gradient-bg text-black font-semibold px-6 py-2 rounded-full hover:opacity-90 transition-opacity text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-16">
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-lime-500 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à l&apos;accueil
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          <span className="text-white">Mentions </span>
          <span className="gradient-text">Légales</span>
        </h1>
        <p className="text-gray-500 text-sm mb-12">
          Dernière mise à jour : 11 mars 2026
        </p>

        <div className="space-y-12 text-gray-300 leading-relaxed">

          {/* 1 – Éditeur */}
          <section className="glass rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full gradient-bg text-black text-sm font-bold flex items-center justify-center shrink-0">1</span>
              Éditeur du site
            </h2>
            <p className="mb-2">
              Le présent site est édité par :
            </p>
            <ul className="space-y-1 ml-4">
              <li><span className="text-white font-semibold">Nom :</span> Victor Verissimo</li>
              <li><span className="text-white font-semibold">Qualité :</span> Coach sportif certifié – Entrepreneur individuel</li>
              <li><span className="text-white font-semibold">Adresse :</span> France</li>
              <li>
                <span className="text-white font-semibold">Téléphone :</span>{" "}
                <a href="tel:0635593164" className="hover:text-lime-500 transition-colors">06 35 59 31 64</a>
              </li>
              <li>
                <span className="text-white font-semibold">Email :</span>{" "}
                <a href="mailto:vverissimo.victor@gmail.com" className="hover:text-lime-500 transition-colors">vverissimo.victor@gmail.com</a>
              </li>
            </ul>
            <p className="mt-4 text-gray-400 text-sm">
              Conformément à l&apos;article 6-I de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN), les informations ci-dessus constituent les mentions légales obligatoires du site.
            </p>
          </section>

          {/* 2 – Directeur de publication */}
          <section className="glass rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full gradient-bg text-black text-sm font-bold flex items-center justify-center shrink-0">2</span>
              Directeur de la publication
            </h2>
            <p>
              Le directeur de la publication est <span className="text-white font-semibold">Victor Verissimo</span>,
              joignable à l&apos;adresse e-mail{" "}
              <a href="mailto:vverissimo.victor@gmail.com" className="text-lime-500 hover:text-lime-400 transition-colors">
                vverissimo.victor@gmail.com
              </a>.
            </p>
          </section>

          {/* 3 – Hébergement */}
          <section className="glass rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full gradient-bg text-black text-sm font-bold flex items-center justify-center shrink-0">3</span>
              Hébergement
            </h2>
            <p className="mb-4">Le site est hébergé par :</p>
            <ul className="space-y-1 ml-4 mb-4">
              <li><span className="text-white font-semibold">Hébergeur :</span> Vercel Inc.</li>
              <li><span className="text-white font-semibold">Adresse :</span> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
              <li>
                <span className="text-white font-semibold">Site :</span>{" "}
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-lime-500 hover:text-lime-400 transition-colors">vercel.com</a>
              </li>
            </ul>
            <p className="mb-2">Les données de la base de données sont hébergées par :</p>
            <ul className="space-y-1 ml-4">
              <li><span className="text-white font-semibold">Prestataire de base de données :</span> Supabase Inc.</li>
              <li><span className="text-white font-semibold">Adresse :</span> 970 Toa Payoh North #07-04, Singapore 318992</li>
              <li>
                <span className="text-white font-semibold">Site :</span>{" "}
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-lime-500 hover:text-lime-400 transition-colors">supabase.com</a>
              </li>
              <li><span className="text-white font-semibold">Région des données :</span> Europe de l&apos;Ouest (eu-west-1)</li>
            </ul>
          </section>

          {/* 4 – Propriété intellectuelle */}
          <section className="glass rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full gradient-bg text-black text-sm font-bold flex items-center justify-center shrink-0">4</span>
              Propriété intellectuelle
            </h2>
            <p className="mb-3">
              L&apos;ensemble du contenu de ce site (textes, images, photographies, logo, structure, mise en page…) est la propriété exclusive de Victor Verissimo ou de ses ayants droit, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="mb-3">
              Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l&apos;autorisation préalable écrite de Victor Verissimo.
            </p>
            <p>
              Toute exploitation non autorisée sera poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
            </p>
          </section>

          {/* 5 – Protection des données personnelles (RGPD) */}
          <section className="glass rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full gradient-bg text-black text-sm font-bold flex items-center justify-center shrink-0">5</span>
              Protection des données personnelles (RGPD)
            </h2>

            <p className="mb-6 text-gray-400 text-sm">
              Conformément au Règlement Général sur la Protection des Données (UE) 2016/679 du 27 avril 2016 (RGPD) et à la loi Informatique et Libertés modifiée.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">5.1 Responsable du traitement</h3>
            <p className="mb-6">
              <span className="text-white font-semibold">Victor Verissimo</span> – vverissimo.victor@gmail.com
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">5.2 Données collectées</h3>
            <p className="mb-3">Dans le cadre de l&apos;utilisation du formulaire de contact, les données suivantes sont collectées :</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-6 text-gray-400">
              <li>Nom complet</li>
              <li>Adresse e-mail</li>
              <li>Objectif sportif (choix parmi une liste prédéfinie)</li>
              <li>Message libre</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-3">5.3 Finalités du traitement</h3>
            <table className="w-full text-sm mb-6 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-white/10 text-white">
                  <th className="text-left p-3">Finalité</th>
                  <th className="text-left p-3">Base légale</th>
                  <th className="text-left p-3">Durée de conservation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="p-3">Répondre aux demandes de contact et de coaching</td>
                  <td className="p-3">Intérêt légitime (art. 6.1.f RGPD)</td>
                  <td className="p-3">3 ans à compter du dernier contact</td>
                </tr>
                <tr>
                  <td className="p-3">Gestion de la relation commerciale (devis, suivi client)</td>
                  <td className="p-3">Exécution du contrat (art. 6.1.b RGPD)</td>
                  <td className="p-3">Durée du contrat + 5 ans (prescription)</td>
                </tr>
                <tr>
                  <td className="p-3">Obligations comptables et fiscales</td>
                  <td className="p-3">Obligation légale (art. 6.1.c RGPD)</td>
                  <td className="p-3">10 ans (art. L.123-22 Code de commerce)</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-lg font-semibold text-white mb-3">5.4 Destinataires des données</h3>
            <p className="mb-3">Les données collectées sont destinées exclusivement à Victor Verissimo. Elles peuvent être transmises aux sous-traitants techniques suivants dans le strict cadre des finalités décrites ci-dessus :</p>
            <ul className="list-disc list-inside space-y-1 ml-2 mb-6 text-gray-400">
              <li>Supabase Inc. (stockage base de données – voir section 3)</li>
            </ul>
            <p className="mb-6">
              Ces sous-traitants sont liés par des clauses contractuelles types garantissant un niveau de protection adéquat conformément au RGPD. Aucune donnée n&apos;est vendue ni cédée à des tiers à des fins commerciales.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">5.5 Transferts hors UE</h3>
            <p className="mb-6">
              Les données peuvent transiter via des serveurs situés hors de l&apos;Union européenne (États-Unis) lors du traitement par Vercel. Ces transferts sont encadrés par des clauses contractuelles types approuvées par la Commission européenne (décision d&apos;exécution UE 2021/914).
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">5.6 Vos droits</h3>
            <p className="mb-3">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="space-y-2 ml-2 mb-4">
              {[
                { right: "Droit d'accès", desc: "obtenir une copie de vos données personnelles" },
                { right: "Droit de rectification", desc: "corriger des données inexactes ou incomplètes" },
                { right: "Droit à l'effacement (« droit à l'oubli »)", desc: "demander la suppression de vos données" },
                { right: "Droit à la limitation", desc: "restreindre temporairement le traitement" },
                { right: "Droit à la portabilité", desc: "recevoir vos données dans un format structuré" },
                { right: "Droit d'opposition", desc: "vous opposer au traitement fondé sur l'intérêt légitime" },
              ].map(({ right, desc }) => (
                <li key={right} className="flex gap-2">
                  <span className="text-lime-500 mt-0.5">•</span>
                  <span><span className="text-white font-semibold">{right}</span> – {desc}</span>
                </li>
              ))}
            </ul>
            <p className="mb-3">
              Pour exercer vos droits, adressez votre demande par e-mail à{" "}
              <a href="mailto:vverissimo.victor@gmail.com" className="text-lime-500 hover:text-lime-400 transition-colors">
                vverissimo.victor@gmail.com
              </a>{" "}
              en indiquant votre nom, prénom et, si possible, l&apos;adresse e-mail utilisée lors du contact.
              Une réponse vous sera apportée dans un délai maximal d&apos;un mois.
            </p>
            <p>
              En cas de réclamation non résolue, vous pouvez saisir la{" "}
              <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className="text-lime-500 hover:text-lime-400 transition-colors">
                CNIL (Commission Nationale de l&apos;Informatique et des Libertés)
              </a>{" "}
              – 3 place de Fontenoy TSA 80715 – 75334 Paris Cedex 07.
            </p>
          </section>

          {/* 6 – Cookies */}
          <section className="glass rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full gradient-bg text-black text-sm font-bold flex items-center justify-center shrink-0">6</span>
              Cookies et traceurs
            </h2>
            <p className="mb-4">
              Ce site utilise uniquement des cookies strictement nécessaires à son bon fonctionnement technique (gestion de la session, sécurité). Aucun cookie publicitaire, de profilage ou de mesure d&apos;audience tiers n&apos;est déposé sans votre consentement explicite.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-white/10 text-white">
                    <th className="text-left p-3">Cookie</th>
                    <th className="text-left p-3">Finalité</th>
                    <th className="text-left p-3">Durée</th>
                    <th className="text-left p-3">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="p-3 font-mono text-xs">sb-*</td>
                    <td className="p-3">Session Supabase (authentification admin)</td>
                    <td className="p-3">Session</td>
                    <td className="p-3">Nécessaire</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              Conformément aux recommandations de la CNIL (délibération n° 2020-091), les cookies strictement nécessaires sont exemptés de consentement.
            </p>
          </section>

          {/* 7 – Responsabilité */}
          <section className="glass rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full gradient-bg text-black text-sm font-bold flex items-center justify-center shrink-0">7</span>
              Limitation de responsabilité
            </h2>
            <p className="mb-3">
              Victor Verissimo s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site, mais ne peut garantir l&apos;exhaustivité ou l&apos;absence d&apos;erreur. Le contenu de ce site est fourni à titre purement informatif.
            </p>
            <p className="mb-3">
              Victor Verissimo ne saurait être tenu responsable des dommages directs ou indirects résultant de l&apos;accès ou de l&apos;utilisation de ce site, ni de l&apos;impossibilité d&apos;y accéder.
            </p>
            <p>
              Les liens hypertextes présents sur le site peuvent renvoyer vers des sites tiers sur lesquels Victor Verissimo n&apos;exerce aucun contrôle et décline toute responsabilité quant à leur contenu.
            </p>
          </section>

          {/* 8 – Loi applicable */}
          <section className="glass rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full gradient-bg text-black text-sm font-bold flex items-center justify-center shrink-0">8</span>
              Droit applicable et juridiction compétente
            </h2>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige relatif à leur interprétation ou à leur exécution, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
            </p>
          </section>

        </div>

        {/* Footer back link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 gradient-bg text-black font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-all hover:scale-105"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
