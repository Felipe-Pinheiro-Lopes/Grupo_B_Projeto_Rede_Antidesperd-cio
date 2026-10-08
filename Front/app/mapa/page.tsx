'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Navigation, ArrowRight, Layers, Clock } from 'lucide-react';

interface MapPoint {
  id: string;
  title: string;
  vendor: string;
  weight: string;
  category: string;
  icon: string;
  time: string;
  isUrgent: boolean;
  topPct: string;
  leftPct: string;
}

export default function MapaPage() {
  const points: MapPoint[] = [
    {
      id: 'lote-1',
      title: 'Feira Vila Mariana (Rua França Pinto, 450)',
      vendor: 'Barraca do Seu Zé',
      weight: '25 kg de Tomates e Folhagens',
      category: 'Hortifrúti',
      icon: '🍎',
      time: 'Hoje até 14:15',
      isUrgent: true,
      topPct: '35%',
      leftPct: '32%',
    },
    {
      id: 'lote-2',
      title: 'Padaria Estrela do Bairro (Bela Vista)',
      vendor: 'Padaria Estrela',
      weight: '18 kg de Pães e Broas',
      category: 'Padaria',
      icon: '🍞',
      time: 'Hoje até 16:00',
      isUrgent: false,
      topPct: '50%',
      leftPct: '65%',
    },
    {
      id: 'lote-3',
      title: 'Restaurante Sabor da Terra (Paraíso)',
      vendor: 'Restaurante Sabor da Terra',
      weight: '35 marmitas prontas',
      category: 'Refeição',
      icon: '🍲',
      time: 'Hoje até 14:00',
      isUrgent: true,
      topPct: '68%',
      leftPct: '45%',
    },
  ];

  const [selectedPoint, setSelectedPoint] = useState<MapPoint>(points[0]);
  const [radius, setRadius] = useState('5 km');

  return (
    <main className="w-full h-[calc(100vh-140px)] flex flex-col justify-between overflow-hidden relative bg-emerald-50/40">
      {/* HEADER DO MAPA */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3.5 z-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center text-lg">
            📍
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">Mapa de Resgates em Tempo Real</h1>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">Geolocalização Ativa</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none"
          >
            <option>3 km</option>
            <option>5 km</option>
            <option>10 km</option>
          </select>
          <Link
            href="/feed"
            className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-xl transition"
          >
            Ver Lista
          </Link>
        </div>
      </div>

      {/* ÁREA GRÁFICA DO MAPA COM PINS */}
      <div className="flex-grow relative overflow-hidden flex items-center justify-center">
        {/* MALHA QUADRICULADA CARTOGRÁFICA */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, #059669 1px, transparent 1px), linear-gradient(to bottom, #059669 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* PINS INTERATIVOS */}
        {points.map((pt) => {
          const isSelected = selectedPoint.id === pt.id;
          return (
            <button
              key={pt.id}
              onClick={() => setSelectedPoint(pt)}
              style={{ top: pt.topPct, left: pt.leftPct }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
            >
              <div className="relative flex items-center justify-center">
                {pt.isUrgent && (
                  <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-red-400 opacity-75"></span>
                )}
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-xl border-2 border-white transition-all transform group-hover:scale-110 ${
                    isSelected
                      ? 'ring-4 ring-emerald-500 scale-110'
                      : ''
                  } ${
                    pt.isUrgent ? 'bg-red-500 text-white' : 'bg-emerald-600 text-white'
                  }`}
                >
                  {pt.icon}
                </div>
              </div>
              <span className="bg-white/95 backdrop-blur-sm text-[10px] font-black text-slate-800 px-2.5 py-1 rounded-full shadow-md border border-slate-200 block mt-1.5 whitespace-nowrap">
                {pt.vendor} ({pt.weight.split(' ')[0]}kg)
              </span>
            </button>
          );
        })}
      </div>

      {/* BOTTOM SHEET DO PONTO SELECIONADO */}
      <div className="p-4 z-20">
        <div className="max-w-xl mx-auto bg-white p-5 rounded-3xl border border-slate-200 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                Ponto de Resgate Selecionado
              </span>
              <span className="text-xs text-slate-400">{selectedPoint.category}</span>
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
              {selectedPoint.title}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedPoint.vendor} • {selectedPoint.weight}
            </p>
            <span className="text-xs text-red-600 font-bold block mt-1 flex items-center gap-1">
              <Clock size={12} /> Tolerância Máxima: {selectedPoint.time}
            </span>
          </div>

          <Link
            href={`/lote/${selectedPoint.id}`}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3.5 rounded-xl shadow-md shadow-emerald-600/20 transition whitespace-nowrap flex items-center justify-center gap-1.5"
          >
            <span>Ver Detalhes do Lote</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
