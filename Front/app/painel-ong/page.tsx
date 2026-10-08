'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDonations } from '@/context/DonationsContext';
import { Search, MapPin, Navigation, Share2, Check, Clock, Heart } from 'lucide-react';

export default function PainelOngPage() {
  const { donations } = useDonations();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeReservations = donations.filter((d) => d.status === 'RESERVADO');

  const handleShareDriver = (item: any) => {
    const text = `🚨 RESGATE DE DOAÇÃO URGENTE\nLote: ${item.title}\nCódigo: ${item.reservationCode}\nLocal: ${item.location}\nTolerância: ${item.expiryTime}\nRede Antidesperdício - Fome Zero`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center text-2xl">
            🤝
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cozinha Comunitária Esperança
            </h1>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
              Painel de Logística e Resgates
            </span>
          </div>
        </div>
        <Link
          href="/feed"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-md transition inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <Search size={16} />
          <span>Buscar Novas Doações</span>
        </Link>
      </div>

      {/* COLETAS EM ANDAMENTO */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-slate-900">Coletas em Andamento ({activeReservations.length})</h2>
          <span className="text-xs text-slate-400">Envie a rota imediatamente ao motorista ou voluntário</span>
        </div>

        {activeReservations.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
            <span className="text-4xl block mb-2">📦</span>
            <h4 className="text-base font-bold text-slate-800 mb-1">Nenhuma coleta ativa no momento</h4>
            <p className="text-xs text-slate-400 mb-4">Explore o mural de doações para reservar excedentes disponíveis.</p>
            <Link
              href="/feed"
              className="text-xs font-bold bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow transition inline-block"
            >
              Ir para o Mural de Doações
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {activeReservations.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    {item.imageUrl}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md font-mono">
                        CÓDIGO: {item.reservationCode || '#REDE-4819'}
                      </span>
                      <span className="text-xs text-slate-400">{item.quantityKg} kg de alimento</span>
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <MapPin size={12} /> {item.location}
                    </p>
                    <span className="text-xs text-red-600 font-bold block mt-1 flex items-center gap-1">
                      <Clock size={12} /> Tolerância Máxima: {item.expiryTime}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 lg:flex-none bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-3 rounded-xl transition text-center inline-flex items-center justify-center gap-1.5"
                  >
                    <Navigation size={14} />
                    <span>Google Maps</span>
                  </a>

                  <button
                    onClick={() => handleShareDriver(item)}
                    className="flex-1 lg:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-xl transition text-center inline-flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    {copiedId === item.id ? <Check size={14} /> : <Share2 size={14} />}
                    <span>{copiedId === item.id ? 'Copiado para WhatsApp!' : 'Enviar ao Motorista'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* HISTÓRICO DE IMPACTO DA INSTITUIÇÃO */}
      <div>
        <h3 className="font-bold text-lg text-slate-900 mb-4">Impacto Acumulado Desta Cozinha Solidária</h3>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 block uppercase mb-1">ALIMENTOS RECEBIDOS</span>
            <span className="text-3xl font-black text-emerald-700">620 kg</span>
            <span className="text-xs text-slate-400 block mt-1">Total de insumos salvos</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 block uppercase mb-1">REFEIÇÕES SERVIDAS</span>
            <span className="text-3xl font-black text-amber-600">1.240 pratos</span>
            <span className="text-xs text-slate-400 block mt-1">Distribuídos a famílias vulneráveis</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 block uppercase mb-1">FEIRANTES PARCEIROS</span>
            <span className="text-3xl font-black text-slate-800">8 barracas</span>
            <span className="text-xs text-slate-400 block mt-1">Conexão direta hiperlocal</span>
          </div>
        </div>
      </div>
    </main>
  );
}
