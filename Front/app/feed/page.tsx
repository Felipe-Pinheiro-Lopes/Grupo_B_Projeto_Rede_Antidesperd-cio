'use client';

import React from 'react';
import Link from 'next/link';
import { useDonations } from '@/context/DonationsContext';
import { FoodCategory } from '@/types/donation';
import { Search, Clock, MapPin, AlertTriangle, Plus, CheckCircle } from 'lucide-react';

export default function FeedPage() {
  const {
    filteredDonations,
    activeCategory,
    setCategory,
    searchQuery,
    setSearch,
  } = useDonations();

  const categories: { key: FoodCategory | 'todos'; label: string; icon: string }[] = [
    { key: 'todos', label: 'Todos', icon: '✨' },
    { key: 'hortifruti', label: 'Hortifrúti', icon: '🍎' },
    { key: 'padaria', label: 'Padaria', icon: '🍞' },
    { key: 'refeicao', label: 'Refeições', icon: '🍲' },
    { key: 'mercearia', label: 'Mercearia', icon: '📦' },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* HEADER DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mural de Doações Ativas</h1>
          <p className="text-sm text-slate-500 mt-0.5">Alimentos próprios para consumo aguardando resgate em feiras e comércios locais.</p>
        </div>
        <Link
          href="/doar"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-md transition inline-flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          <span>+ Anunciar Doação</span>
        </Link>
      </div>

      {/* BARRA DE PESQUISA E FILTROS */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        {/* INPUT DE BUSCA */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por alimento, feira ou bairro..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>

        {/* PÍLULAS DE CATEGORIA */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* BANNER DE URGÊNCIA */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between mb-8 shadow-sm">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-amber-600 flex-shrink-0" size={24} />
          <div>
            <span className="font-bold text-amber-900 text-sm block">Feira da Vila Mariana encerrando agora!</span>
            <span className="text-xs text-amber-700">Lotes perecíveis com tolerância limite para hoje até 14:15. Resgate com prioridade máxima.</span>
          </div>
        </div>
        <button
          onClick={() => setSearch('Vila Mariana')}
          className="text-xs font-bold bg-amber-500 text-white px-3.5 py-1.5 rounded-xl hover:bg-amber-600 transition whitespace-nowrap"
        >
          Ver Lotes da Feira
        </button>
      </div>

      {/* GRADE DE CARDS */}
      {filteredDonations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <span className="text-5xl block mb-3">🔍</span>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Nenhum lote encontrado com esses filtros</h3>
          <p className="text-xs text-slate-400 mb-4">Tente buscar por outro termo ou limpar os filtros de categoria.</p>
          <button
            onClick={() => {
              setCategory('todos');
              setSearch('');
            }}
            className="text-xs font-bold bg-emerald-600 text-white px-4 py-2 rounded-xl"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* CABEÇALHO VISUAL DO CARD */}
                <div className="relative h-44 bg-emerald-50 flex items-center justify-center text-6xl">
                  {item.imageUrl}
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-1">
                    <Clock size={12} />
                    {item.expiryTime}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {item.category.toUpperCase()}
                  </span>
                </div>

                {/* DETALHES */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {item.quantityKg} kg estimados
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin size={12} /> 1.2 km
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 mb-1 leading-snug line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-1">
                    {item.donorName} • {item.location}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <strong className={item.status === 'DISPONIVEL' ? 'text-emerald-600' : 'text-amber-600'}>
                        {item.status}
                      </strong>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 pt-1 border-t border-slate-200/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* BOTÕES DE AÇÃO */}
              <div className="p-5 pt-0 flex gap-2">
                <Link
                  href={`/lote/${item.id}`}
                  className="w-1/2 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-3 rounded-xl transition"
                >
                  Detalhes
                </Link>
                <Link
                  href={`/lote/${item.id}`}
                  className="w-1/2 text-center text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl shadow-md shadow-emerald-600/20 transition"
                >
                  Reservar Lote
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
