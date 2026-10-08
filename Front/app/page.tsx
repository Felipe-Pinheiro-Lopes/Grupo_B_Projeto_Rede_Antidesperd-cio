'use client';

import React from 'react';
import Link from 'next/link';
import { useDonations } from '@/context/DonationsContext';
import { ArrowRight, Sparkles, Scale, Clock, MapPin, Leaf, HeartHandshake } from 'lucide-react';

export default function HomePage() {
  const { metrics, donations } = useDonations();
  const lastDonation = donations[0];

  return (
    <main className="w-full">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          {/* BADGE ODS */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Alinhado com o ODS 2 (Fome Zero) • Lei Federal 14.016/2020
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Onde a sobra vira prato:{' '}
            <span className="text-emerald-600 underline decoration-amber-400 decoration-wavy">
              do feirante à mesa
            </span>{' '}
            de quem tem fome.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
            Conectamos feirantes, quitandas e restaurantes locais a cozinhas comunitárias e ONGs em tempo real. Publicação de excedentes em menos de 45 segundos, resgate hiperlocal e impacto ambiental auditado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href="/feed"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-600/30 transition text-base flex items-center justify-center gap-2"
            >
              <span>Explorar Doações Disponíveis</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/doar"
              className="bg-amber-500 hover:bg-amber-600 text-white text-center font-bold px-8 py-4 rounded-2xl shadow-xl shadow-amber-500/20 transition text-base flex items-center justify-center gap-2"
            >
              <span>🍎 Cadastrar Sobra Rápida</span>
            </Link>
          </div>

          {/* MARCO JURÍDICO */}
          <div className="flex items-center gap-3 text-xs text-slate-600 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-w-lg">
            <Scale className="text-emerald-600 flex-shrink-0" size={24} />
            <div>
              <strong className="text-slate-800 block">Segurança Sanitária & Jurídica:</strong>
              Doações com respaldo integral na Lei Federal nº 14.016/2020 de combate ao desperdício de alimentos.
            </div>
          </div>
        </div>

        {/* CARD DINÂMICO DE IMPACTO */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500 to-amber-400 rounded-3xl opacity-20 blur-2xl"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center text-2xl">
                  {lastDonation ? lastDonation.imageUrl : '📦'}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Último Lote Disponível</h3>
                  <span className="text-xs text-slate-400">{lastDonation?.location || 'Feira Livre'}</span>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                {lastDonation?.status || 'Ativo'}
              </span>
            </div>

            {/* 3 STATS RÁPIDOS */}
            <div className="grid grid-cols-3 gap-3 text-center mb-6">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-2xl font-black text-emerald-600 block">{metrics.totalKgSaved} kg</span>
                <span className="text-[11px] text-slate-500 font-semibold">Alimentos Salvos</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-2xl font-black text-amber-600 block">{metrics.mealsServed}</span>
                <span className="text-[11px] text-slate-500 font-semibold">Pratos Servidos</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <span className="text-2xl font-black text-blue-600 block">{metrics.co2AvoidedKg} kg</span>
                <span className="text-[11px] text-slate-500 font-semibold">CO₂e Evitado</span>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="block text-center text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 py-3.5 rounded-xl transition"
            >
              Acompanhar Painel Completo ESG →
            </Link>
          </div>
        </div>
      </section>

      {/* 3 PILARES ESG */}
      <section className="bg-emerald-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-emerald-800/60 p-6 rounded-2xl border border-emerald-700">
            <Clock className="text-amber-400 mb-3" size={32} />
            <h3 className="text-xl font-bold mb-2">Publicação em 45 Segundos</h3>
            <p className="text-emerald-200 text-sm leading-relaxed">
              O feirante tira uma foto no celular, define a quantidade em quilos e publica o anúncio antes de fechar a barraca, sem burocracias.
            </p>
          </div>

          <div className="bg-emerald-800/60 p-6 rounded-2xl border border-emerald-700">
            <MapPin className="text-amber-400 mb-3" size={32} />
            <h3 className="text-xl font-bold mb-2">Conexão Hiperlocal</h3>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Notificação para ONGs e cozinhas comunitárias em raio de até 5km, viabilizando retirada imediata no mesmo dia.
            </p>
          </div>

          <div className="bg-emerald-800/60 p-6 rounded-2xl border border-emerald-700">
            <Leaf className="text-amber-400 mb-3" size={32} />
            <h3 className="text-xl font-bold mb-2">Impacto Socioambiental Auditável</h3>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Algoritmo científico que mensura quilos resgatados e emissões de gás metano (CH₄) evitadas de aterros sanitários.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
