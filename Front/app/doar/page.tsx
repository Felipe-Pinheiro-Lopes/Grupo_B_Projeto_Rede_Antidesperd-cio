'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDonations } from '@/context/DonationsContext';
import { FoodCategory } from '@/types/donation';
import { Sparkles, Clock, Check, ArrowLeft } from 'lucide-react';

export default function DoarPage() {
  const router = useRouter();
  const { addDonation } = useDonations();

  const [category, setCategory] = useState<FoodCategory>('hortifruti');
  const [quantityKg, setQuantityKg] = useState(20);
  const [expiryTime, setExpiryTime] = useState('Hoje até 14:15');
  const [description, setDescription] = useState('3 caixas de verduras mistas e bananas maduras');
  const [donorName, setDonorName] = useState('Barraca do Seu Zé');
  const [location, setLocation] = useState('Feira Vila Mariana (Rua França Pinto)');

  const categoryOptions: { key: FoodCategory; icon: string; label: string }[] = [
    { key: 'hortifruti', icon: '🍎', label: 'Hortifrúti' },
    { key: 'padaria', icon: '🍞', label: 'Padaria' },
    { key: 'refeicao', icon: '🍲', label: 'Refeição' },
    { key: 'mercearia', icon: '📦', label: 'Outros' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDonation({
      title: `${quantityKg} kg de ${category === 'hortifruti' ? 'Hortifrúti Misto' : category === 'padaria' ? 'Pães e Broas' : category === 'refeicao' ? 'Refeições Prontas' : 'Mercearia'}`,
      category,
      quantityKg,
      donorName,
      donorType: 'Feirante',
      location,
      phoneContact: '(11) 98765-4321',
      expiryTime,
      description,
      imageUrl: category === 'hortifruti' ? '🍅🥬' : category === 'padaria' ? '🥖🥐' : category === 'refeicao' ? '🍲🥘' : '📦🥫',
    });
    router.push('/painel-doador');
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link href="/feed" className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1">
          <ArrowLeft size={14} />
          <span>Cancelar</span>
        </Link>
        <span className="text-[11px] font-black bg-amber-100 text-amber-800 px-3 py-1 rounded-full uppercase tracking-wider">
          ⏱️ Cadastro Rápido (45 seg)
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Nova Doação de Excedente</h1>
          <p className="text-xs text-slate-500 mt-1">Avise as ONGs vizinhas antes de encerrar sua feira ou turno.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. CATEGORIA COM ÍCONES GRANDES */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              1. Tipo de Alimento
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categoryOptions.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setCategory(opt.key)}
                  className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition ${
                    category === opt.key
                      ? 'bg-emerald-50 border-2 border-emerald-500 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span className="text-3xl mb-1">{opt.icon}</span>
                  <span className={`text-xs font-bold ${category === opt.key ? 'text-emerald-900' : 'text-slate-700'}`}>
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. QUANTIDADE EM KG COM CHIPS */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              2. Quantidade Aproximada (KG)
            </label>
            <div className="flex items-center gap-3 mb-2">
              <input
                type="number"
                min="1"
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-28 text-center font-black text-2xl py-2 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="font-bold text-slate-500 text-sm">Quilos estimados</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[5, 10, 25, 50].map((add) => (
                <button
                  key={add}
                  type="button"
                  onClick={() => setQuantityKg((prev) => prev + add)}
                  className="text-xs font-bold px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                >
                  +{add} kg
                </button>
              ))}
            </div>
          </div>

          {/* 3. HORÁRIO LIMITE */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              3. Retirar Até Que Horas?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Hoje até 14:15', 'Hoje até 15:00', 'Hoje até 18:00'].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setExpiryTime(time)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-center transition ${
                    expiryTime === time
                      ? 'bg-red-50 border-2 border-red-400 text-red-900 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* 4. DESCRIÇÃO */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              4. Descrição do que há no lote
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* BOTÃO DE SUBMISSÃO */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl text-center shadow-xl shadow-emerald-600/30 transition text-base"
          >
            🚀 Publicar Doação Imediatamente
          </button>
        </form>
      </div>
    </main>
  );
}
