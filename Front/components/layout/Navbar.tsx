'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlusCircle, MapPin, BarChart3, Store } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/feed', label: 'Doações Ativas' },
    { href: '/dashboard', label: 'Painel ESG' },
    { href: '/mapa', label: 'Mapa de Feiras' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100 px-4 sm:px-6 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-emerald-100 group-hover:bg-emerald-200 text-emerald-800 rounded-xl flex items-center justify-center text-xl transition">
            🌿
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight block leading-tight">
              Rede Antidesperdício
            </span>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">
              ODS 2: Fome Zero • Grupo B
            </span>
          </div>
        </Link>

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 font-semibold text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition px-2 py-1 rounded-lg ${
                  isActive
                    ? 'text-emerald-700 font-bold bg-emerald-50'
                    : 'text-slate-600 hover:text-emerald-600'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* AÇÕES RÁPIDAS */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="text-xs sm:text-sm font-bold text-slate-600 hover:text-emerald-700 px-3 py-2 rounded-xl hover:bg-slate-50 transition"
          >
            Entrar
          </Link>
          <Link
            href="/doar"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5"
          >
            <PlusCircle size={16} />
            <span>Doar Agora</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
