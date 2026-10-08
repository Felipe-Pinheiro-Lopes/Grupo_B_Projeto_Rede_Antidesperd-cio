import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 px-6 border-t border-slate-800 text-sm mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-extrabold text-lg mb-1">
            <span>🌿</span> Rede Antidesperdício
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Conectando o excedente das feiras livres e comércios a quem mais precisa. Em conformidade estrita com a Lei Federal nº 14.016/2020.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-300">
          <Link href="/" className="hover:text-emerald-400 transition">Início</Link>
          <Link href="/feed" className="hover:text-emerald-400 transition">Doações</Link>
          <Link href="/dashboard" className="hover:text-emerald-400 transition">Métricas ESG</Link>
          <Link href="/mapa" className="hover:text-emerald-400 transition">Mapa</Link>
          <Link href="/doar" className="hover:text-emerald-400 transition">Quero Doar</Link>
        </div>

        <div className="text-xs text-slate-500">
          <span className="block font-semibold text-emerald-400">Hackathon Frameworks Front-end</span>
          <span>Grupo B • Felipe, Anthony & Nicolas</span>
        </div>
      </div>
    </footer>
  );
}
