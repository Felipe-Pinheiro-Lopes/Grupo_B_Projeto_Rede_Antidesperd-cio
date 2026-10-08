'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Heart, Store } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<'doador' | 'ong'>('doador');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile === 'doador') {
      router.push('/painel-doador');
    } else {
      router.push('/painel-ong');
    }
  };

  return (
    <main className="max-w-md w-full mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block text-4xl p-3 bg-emerald-100 rounded-3xl mb-3 hover:scale-105 transition">
          🌿
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Acesse a Rede</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Conectando o excedente de alimentos à solidariedade</p>
      </div>

      {/* SELETOR DUAL DE PERFIL */}
      <div className="grid grid-cols-2 gap-2 mb-6 bg-slate-200/60 p-1.5 rounded-2xl">
        <button
          type="button"
          onClick={() => setProfile('doador')}
          className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            profile === 'doador'
              ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Store size={14} />
          <span>Quero Doar</span>
        </button>
        <button
          type="button"
          onClick={() => setProfile('ong')}
          className={`py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            profile === 'ong'
              ? 'bg-white text-emerald-800 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Heart size={14} />
          <span>Sou ONG / Cozinha</span>
        </button>
      </div>

      {/* FORMULÁRIO */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {profile === 'doador' ? 'Nome da Barraca / Estabelecimento' : 'Nome da ONG / Cozinha Comunitária'}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={profile === 'doador' ? 'Ex: Barraca do Zé (Feira Livre)' : 'Ex: Cozinha da Esperança'}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              WhatsApp para Contato
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(11) 98765-4321"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {profile === 'doador' ? 'Ponto de Feira / Endereço' : 'Bairro de Atuação / Endereço'}
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={profile === 'doador' ? 'Ex: Feira de Domingo - Rua França Pinto' : 'Ex: Vila Mariana, São Paulo'}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* TERMOS LEI 14.016/2020 */}
          <div className="flex items-start gap-2 pt-2">
            <input type="checkbox" id="terms" required defaultChecked className="mt-1 rounded text-emerald-600 focus:ring-emerald-500" />
            <label htmlFor="terms" className="text-xs text-slate-500 leading-snug">
              Declaro conformidade com os critérios sanitários e de integridade previstos na <strong className="text-slate-800">Lei Federal nº 14.016/2020</strong>.
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-center shadow-lg shadow-emerald-600/20 transition text-sm"
            >
              {profile === 'doador' ? 'Entrar no Painel do Doador →' : 'Entrar no Painel da ONG →'}
            </button>
          </div>
        </form>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        <Link href="/" className="hover:underline flex items-center justify-center gap-1">
          <ArrowLeft size={14} />
          <span>Voltar para a Página Inicial</span>
        </Link>
      </p>
    </main>
  );
}
