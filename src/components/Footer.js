'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-blue-900 text-white px-10 py-5 shadow-2xl rounded-t-2xl mt-12 text-lg flex flex-col md:flex-row items-center justify-between gap-4 border-t-4 border-blue-700/40" style={{minHeight:'70px'}}>
      <div className="flex items-center gap-3">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="inline-block"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" d="M8 12h8M12 8v8"/></svg>
        <span className="font-bold">Plateforme Candidatures</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-sm text-white/90">
        <span>Gérez vos candidatures, offres et dossiers facilement et en toute sécurité.</span>
        <a href="/privacy" className="underline hover:text-orange-300 transition-colors">Politique de confidentialité</a>
        <a href="https://linkedin.com/company/exemple" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors">LinkedIn</a>
        <span className="text-white/70">&copy; {new Date().getFullYear()} Tous droits réservés.</span>
      </div>
      <div className="flex gap-4">
        <a href="/" className="hover:text-orange-300 transition-colors px-2 py-1 rounded-lg hover:bg-white/10">Accueil</a>
        <a href="/contacts" className="hover:text-orange-300 transition-colors px-2 py-1 rounded-lg hover:bg-white/10">Contact</a>
        <a href="mailto:support@exemple.com" className="hover:text-orange-300 transition-colors px-2 py-1 rounded-lg hover:bg-white/10">Support</a>
      </div>
    </footer>
  );
} 