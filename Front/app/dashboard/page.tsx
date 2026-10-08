'use client';

import React from 'react';
import Link from 'next/link';
import { useDonations } from '@/context/DonationsContext';
import { Leaf, Utensils, CloudRain, Award, ArrowLeft, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const { metrics, donations } = useDonations();

  // Cálculo proporcional por categoria
  const total = metrics.totalKgSaved || 1;
  const hortiKg = donations.filter(d => d.category === 'hortifruti').reduce((acc, c) => acc + c.quantityKg, 0);
  const padariaKg = donations.filter(d => d.category === 'padaria').reduce((acc, c) => acc + c.quantityKg, 0);
  const refeicaoKg = donations.filter(d => d.category === 'refeicao').reduce((acc, c) => acc + c.quantityKg, 0);
  const outrosKg = donations.filter(d => d.category === 'mercearia').reduce((acc, c) => acc + c.quantityKg, 0);

  const hortiPct = Math.round((hortiKg / total) * 100);
  const padariaPct = Math.round((padariaKg / total) * 100);
  const refeicaoPct = Math.round((refeicaoKg / total) * 100);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* HEADER DO DASHBOARD */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Relatório Auditável ODS 2 & 12.3
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Painel de Impacto Socioambiental ESG</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Métricas científicas baseadas nas diretrizes globais do Food Waste Index (FAO/ONU) e cálculos de mitigação de carbono.
          </p>
        </div>
        <Link
          href="/feed"
          className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200 transition inline-flex items-center gap-1.5 self-start"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao Mural</span>
        </Link>
      </div>

      {/* OS 3 BIG NUMBERS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* CARD 1 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center text-2xl mb-4">
            <Leaf size={24} />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Total de Alimentos Salvos</span>
          <div className="text-4xl font-black text-emerald-700 mb-2">
            {metrics.totalKgSaved.toLocaleString()} <span className="text-lg font-bold text-slate-500">kg</span>
          </div>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp size={14} /> Resgates em feiras e comércio local
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center text-2xl mb-4">
            <Utensils size={24} />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Refeições Nutritivas Geradas</span>
          <div className="text-4xl font-black text-amber-600 mb-2">
            {metrics.mealsServed.toLocaleString()} <span className="text-lg font-bold text-slate-500">pratos</span>
          </div>
          <p className="text-xs text-amber-600 font-semibold">
            Estimativa de 400g a 500g balanceados por porção
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center text-2xl mb-4">
            <CloudRain size={24} />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">CO₂e Evitado de Aterros</span>
          <div className="text-4xl font-black text-blue-600 mb-2">
            {metrics.co2AvoidedKg.toLocaleString()} <span className="text-lg font-bold text-slate-500">kg</span>
          </div>
          <p className="text-xs text-blue-600 font-semibold">
            Mitigação de decomposição anaeróbica de metano (CH₄)
          </p>
        </div>
      </div>

      {/* SEÇÃO ANALÍTICA: BARRAS & RANKING */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* GRÁFICO DE CATEGORIAS */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-extrabold text-lg text-slate-900 mb-1">Distribuição de Alimentos Salvos</h3>
          <p className="text-xs text-slate-400 mb-6">Percentual por grupo nutricional resgatado</p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-700">🍎 Hortifrúti Fresco (Legumes e Frutas)</span>
                <span className="text-emerald-700">{hortiKg} kg ({hortiPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${hortiPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-700">🍞 Padaria & Panificação</span>
                <span className="text-amber-700">{padariaKg} kg ({padariaPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${padariaPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-700">🍲 Refeições Prontas Higienizadas</span>
                <span className="text-orange-700">{refeicaoKg} kg ({refeicaoPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full transition-all duration-500" style={{ width: `${refeicaoPct}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* TOP FEIRANTES SOLIDÁRIOS */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Comércios Amigos da Fome Zero</h3>
              <p className="text-xs text-slate-400">Parceiros com maior volume acumulado de doação</p>
            </div>
            <Award className="text-amber-500" size={24} />
          </div>

          <div className="divide-y divide-slate-100">
            <div className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-black text-xs flex items-center justify-center">1º</span>
                <div>
                  <strong className="text-xs sm:text-sm text-slate-900 block">Barraca do Seu Zé</strong>
                  <span className="text-[11px] text-slate-400">Feira Livre Vila Mariana</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                480 kg doados
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center">2º</span>
                <div>
                  <strong className="text-xs sm:text-sm text-slate-900 block">Padaria Estrela do Bairro</strong>
                  <span className="text-[11px] text-slate-400">Bela Vista</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                310 kg doados
              </span>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center">3º</span>
                <div>
                  <strong className="text-xs sm:text-sm text-slate-900 block">Sacolão da Fartura</strong>
                  <span className="text-[11px] text-slate-400">Pinheiros</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                245 kg doados
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
