'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDonations } from '@/context/DonationsContext';
import { Plus, Award, CheckCircle2, Clock, Store } from 'lucide-react';

export default function PainelDoadorPage() {
  const { donations, completeDonation } = useDonations();
  const [inputCode, setInputCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const myDonations = donations;
  const reservedDonations = myDonations.filter((d) => d.status === 'RESERVADO');
  const availableDonations = myDonations.filter((d) => d.status === 'DISPONIVEL');
  const completedDonations = myDonations.filter((d) => d.status === 'CONCLUIDO');

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const target = myDonations.find(
      (d) => d.reservationCode?.toUpperCase() === inputCode.trim().toUpperCase()
    );

    if (target) {
      completeDonation(target.id, target.reservationCode || '');
      setSuccessMessage(`Entrega do lote "${target.title}" concluída com sucesso! Impacto computado no painel ESG.`);
      setInputCode('');
      setTimeout(() => setSuccessMessage(''), 5000);
    } else {
      alert('Código não encontrado ou já concluído. Verifique o código com o voluntário da ONG.');
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center text-2xl">
            🍎
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Barraca do Seu Zé</h1>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">Painel do Feirante Doador</span>
          </div>
        </div>
        <Link
          href="/doar"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-md transition inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>+ Anunciar Nova Sobra</span>
        </Link>
      </div>

      {/* METRICAS DO FEIRANTE */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 block uppercase mb-1">TOTAL DOADO POR VOCÊ</span>
          <div className="text-3xl font-black text-emerald-700">480 kg</div>
          <span className="text-xs text-emerald-600 font-semibold">↑ Contribuição ativa para o ODS 2</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 block uppercase mb-1">FAMÍLIAS NUTRIDAS</span>
          <div className="text-3xl font-black text-amber-600">~960 pratos</div>
          <span className="text-xs text-amber-600 font-semibold">Repassados a cozinhas solidárias</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 block uppercase mb-1">SEU RECONHECIMENTO</span>
            <span className="text-base font-black text-slate-900 block">Selo Ouro Fome Zero 🏅</span>
            <span className="text-[11px] text-slate-400">Certificado comunitário</span>
          </div>
          <button
            onClick={() => alert('Certificado emitido! Pronto para impressão e fixação na barraca da feira.')}
            className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl border border-emerald-200 transition"
          >
            Imprimir Selo
          </button>
        </div>
      </div>

      {/* VALIDADOR DE CÓDIGO DA ONG */}
      <div className="bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="font-extrabold text-lg sm:text-xl mb-1">A ONG chegou para retirar os alimentos?</h3>
          <p className="text-emerald-200 text-xs sm:text-sm">
            Peça o código de 4 dígitos (#REDE-XXXX) ao voluntário para confirmar a entrega no sistema.
          </p>
        </div>

        <form onSubmit={handleValidate} className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            required
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="#REDE-XXXX"
            className="px-4 py-3 rounded-2xl text-slate-900 font-mono font-bold text-sm focus:outline-none w-44 text-center uppercase shadow-inner"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black px-6 py-3 rounded-2xl text-sm transition shadow-md whitespace-nowrap"
          >
            Confirmar Baixa
          </button>
        </form>
      </div>

      {successMessage && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-4 rounded-2xl mb-6 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* LISTA DE LOTES */}
      <div>
        <h3 className="font-bold text-lg text-slate-900 mb-4">Lotes Aguardando Retirada ({reservedDonations.length})</h3>
        {reservedDonations.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-xs text-slate-400 mb-8">
            Nenhum lote com retirada pendente no momento.
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {reservedDonations.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    {item.imageUrl}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                        RESERVADO
                      </span>
                      <span className="text-xs text-slate-400">
                        {item.reservedByOng || 'Instituição Cadastrada'}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-base text-slate-900">{item.title}</h4>
                    <span className="text-xs text-red-600 font-bold block mt-0.5">
                      ⏰ {item.expiryTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-0 pt-3 md:pt-0">
                  <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3.5 py-2 rounded-xl">
                    Código Esperado: {item.reservationCode}
                  </span>
                  <button
                    onClick={() => {
                      completeDonation(item.id, item.reservationCode || '');
                      setSuccessMessage(`Entrega de "${item.title}" concluída com sucesso!`);
                      setTimeout(() => setSuccessMessage(''), 5000);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm whitespace-nowrap"
                  >
                    Liberar Alimento
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
