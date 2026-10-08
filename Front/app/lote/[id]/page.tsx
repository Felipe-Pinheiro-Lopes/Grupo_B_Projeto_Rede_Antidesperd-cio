'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useDonations } from '@/context/DonationsContext';
import { ArrowLeft, Clock, MapPin, Scale, Check, Copy, MessageSquare, AlertCircle } from 'lucide-react';

export default function LoteDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { donations, reserveDonation } = useDonations();
  
  const loteId = params.id as string;
  const item = donations.find((d) => d.id === loteId) || donations[0];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(item.reservationCode || '');
  const [copied, setCopied] = useState(false);

  const handleReserve = () => {
    const code = reserveDonation(item.id, 'Cozinha Solidária Comunitária');
    setGeneratedCode(code);
    setIsModalOpen(true);
  };

  const copyCode = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* NAVEGAÇÃO DE TOPO */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/feed"
          className="text-xs sm:text-sm font-bold text-emerald-700 flex items-center gap-1.5 hover:underline"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao Mural</span>
        </Link>
        <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
          item.status === 'DISPONIVEL' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {item.status}
        </span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* HEADER VISUAL */}
        <div className="h-60 sm:h-72 bg-emerald-50 flex items-center justify-center text-8xl relative">
          {item.imageUrl}
          <div className="absolute bottom-4 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm">
            🍎 Categoria: {item.category.toUpperCase()}
          </div>
        </div>

        {/* CORPO DO DETALHE */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-black text-red-600 uppercase tracking-widest block mb-1">
                ⏰ Tolerância: {item.expiryTime}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {item.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {item.donorName} • {item.donorType}
              </p>
            </div>
            <div className="text-left sm:text-right bg-emerald-50 sm:bg-transparent p-3 sm:p-0 rounded-xl">
              <span className="text-xs text-slate-400 block font-medium">Quantidade Estimada:</span>
              <span className="text-3xl font-black text-emerald-700">{item.quantityKg} kg</span>
            </div>
          </div>

          {/* ALERTA DE HORÁRIO */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3.5 mb-8 text-xs sm:text-sm">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <strong className="text-red-900 block font-bold">Atenção ao desmonte do ponto de coleta:</strong>
              <p className="text-red-700 mt-0.5">
                O feirante/comerciante aguardará a retirada no local até <strong className="underline">{item.expiryTime}</strong>. Após esse horário, os itens poderão ser descartados.
              </p>
            </div>
          </div>

          {/* FICHA TÉCNICA */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8 text-xs sm:text-sm">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block uppercase mb-1">CONDIÇÕES DO ALIMENTO</span>
              <p className="text-slate-700 font-medium leading-relaxed">{item.description}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 block uppercase mb-1">LOCAL DE RETIRADA</span>
              <p className="text-slate-700 font-medium leading-relaxed">{item.location}</p>
              <span className="text-[11px] text-slate-400 block mt-1">Contato: {item.phoneContact}</span>
            </div>
          </div>

          {/* SEGURANÇA JURÍDICA ESG */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-8 flex items-center gap-3 text-xs text-emerald-900">
            <Scale className="text-emerald-700 flex-shrink-0" size={24} />
            <div>
              <strong className="block">Conformidade Legal Assegurada (Lei Federal nº 14.016/2020):</strong>
              Alimentos higienizados e próprios para consumo doados sem ônus para segurança nutricional de populações assistidas.
            </div>
          </div>

          {/* BOTÕES DE AÇÃO */}
          <div className="flex flex-col sm:flex-row gap-4">
            {item.status === 'DISPONIVEL' ? (
              <button
                onClick={handleReserve}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-600/30 transition text-base text-center"
              >
                🤝 Reservar Este Lote para Minha ONG
              </button>
            ) : (
              <button
                disabled
                className="flex-1 bg-slate-200 text-slate-500 font-bold py-4 rounded-2xl cursor-not-allowed text-base text-center"
              >
                Lote Já Reservado ({item.reservationCode})
              </button>
            )}

            <Link
              href="/mapa"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-center font-bold px-6 py-4 rounded-2xl transition text-base"
            >
              📍 Ver no Mapa
            </Link>
          </div>
        </div>
      </div>

      {/* MODAL DE RESERVA (TELA 05) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
            {/* ÍCONE DE SUCESSO */}
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              ✓
            </div>

            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
              Reserva Efetuada com Sucesso!
            </span>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Lote Garantido para Sua Entidade</h2>
            <p className="text-xs text-slate-500 mb-6">
              Apresente o código abaixo ao feirante no momento do resgate físico para liberação dos alimentos.
            </p>

            {/* CAIXA DO CÓDIGO */}
            <div className="bg-slate-50 border-2 border-dashed border-emerald-400 p-6 rounded-2xl mb-6">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">CÓDIGO DE RESGATE SEGURO</span>
              <div className="text-4xl font-mono font-black text-emerald-800 tracking-wider mb-2">
                {generatedCode}
              </div>
              <button
                onClick={copyCode}
                className="text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-4 py-1.5 rounded-lg transition inline-flex items-center gap-1.5"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Código Copiado!' : 'Copiar Código'}</span>
              </button>
            </div>

            {/* DADOS DA COLETA */}
            <div className="text-left bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 mb-6 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Doador:</span>
                <strong className="text-slate-800">{item.donorName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Local:</span>
                <strong className="text-slate-800">{item.location}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tolerância Máxima:</span>
                <strong className="text-red-600 font-bold">{item.expiryTime}</strong>
              </div>
            </div>

            {/* AÇÕES */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/5511999999999?text=Ol%C3%A1%2C%20reservei%20o%20lote%20${generatedCode}%20pela%20Rede%20Antidesperd%C3%ADcio!`}
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md transition text-xs sm:text-sm"
              >
                💬 Abrir WhatsApp do Doador
              </a>
              <Link
                href="/painel-ong"
                className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition text-xs sm:text-sm"
              >
                Ir para Meu Painel de Coletas
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
