'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Donation, FoodCategory, ImpactMetrics } from '@/types/donation';
import { INITIAL_DONATIONS, ESG_COEFFICIENTS } from '@/lib/constants';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://grupo-b-projeto-rede-antidesperd-cio.onrender.com/api';

interface DonationsContextType {
  donations: Donation[];
  filteredDonations: Donation[];
  activeCategory: FoodCategory | 'todos';
  searchQuery: string;
  isLoading: boolean;
  isBackendConnected: boolean;
  setCategory: (category: FoodCategory | 'todos') => void;
  setSearch: (query: string) => void;
  reserveDonation: (id: string, ongName: string) => string;
  completeDonation: (id: string, code: string) => boolean;
  addDonation: (donation: Omit<Donation, 'id' | 'status' | 'createdAt'>) => string;
  metrics: ImpactMetrics;
  refreshDonations: () => Promise<void>;
}

const DonationsContext = createContext<DonationsContextType | undefined>(undefined);

export function DonationsProvider({ children }: { children: React.ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>(INITIAL_DONATIONS);
  const [activeCategory, setActiveCategory] = useState<FoodCategory | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  const fetchDonationsFromApi = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/donations`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setDonations(data);
          setIsBackendConnected(true);
          if (typeof window !== 'undefined') {
            localStorage.setItem('rede_antidesperdicio_donations', JSON.stringify(data));
          }
          return;
        }
      }
    } catch (e) {
      console.warn('⚠️ Falha ao carregar doações do backend Render, utilizando estado local:', e);
    } finally {
      setIsLoading(false);
    }

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rede_antidesperdicio_donations');
      if (saved) {
        try {
          setDonations(JSON.parse(saved));
        } catch (e) {
          console.error('Erro ao ler localStorage', e);
        }
      }
    }
  };

  useEffect(() => {
    fetchDonationsFromApi();
  }, []);

  const saveState = (newDonations: Donation[]) => {
    setDonations(newDonations);
    if (typeof window !== 'undefined') {
      localStorage.setItem('rede_antidesperdicio_donations', JSON.stringify(newDonations));
    }
  };

  const reserveDonation = (id: string, ongName: string): string => {
    const code = `#REDE-${Math.floor(1000 + Math.random() * 9000)}`;

    const updated = donations.map((d) => {
      if (d.id === id) {
        return {
          ...d,
          status: 'RESERVADO' as const,
          reservedByOng: ongName,
          reservationCode: code,
        };
      }
      return d;
    });
    saveState(updated);

    fetch(`${API_BASE_URL}/donations/${id}/reserve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reservedByOng: ongName }),
    })
      .then(async (res) => {
        if (res.ok) {
          const body = await res.json();
          if (body.donation) {
            setDonations((prev) =>
              prev.map((d) => (d.id === id ? body.donation : d))
            );
          }
        }
      })
      .catch((err) => console.error('Erro ao syncear reserva com backend:', err));

    return code;
  };

  const completeDonation = (id: string, code: string): boolean => {
    let success = false;
    const updated = donations.map((d) => {
      if (d.id === id && (d.reservationCode === code || !code)) {
        success = true;
        return {
          ...d,
          status: 'CONCLUIDO' as const,
        };
      }
      return d;
    });

    if (success) {
      saveState(updated);

      fetch(`${API_BASE_URL}/donations/${id}/complete`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then(async (res) => {
          if (res.ok) {
            const body = await res.json();
            if (body.donation) {
              setDonations((prev) =>
                prev.map((d) => (d.id === id ? body.donation : d))
              );
            }
          }
        })
        .catch((err) => console.error('Erro ao concluir doação no backend:', err));
    }

    return success;
  };

  const addDonation = (data: Omit<Donation, 'id' | 'status' | 'createdAt'>): string => {
    const newId = `lote-${Date.now()}`;
    const newDonation: Donation = {
      ...data,
      id: newId,
      status: 'DISPONIVEL',
      createdAt: new Date().toISOString(),
    };

    saveState([newDonation, ...donations]);

    fetch(`${API_BASE_URL}/donations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        if (res.ok) {
          const created: Donation = await res.json();
          setDonations((prev) =>
            prev.map((d) => (d.id === newId ? created : d))
          );
        }
      })
      .catch((err) => console.error('Erro ao enviar doação ao backend:', err));

    return newId;
  };

  const filteredDonations = donations.filter((d) => {
    const matchesCategory = activeCategory === 'todos' || d.category === activeCategory;
    const matchesQuery =
      searchQuery === '' ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.donorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const totalKg = donations.reduce((acc, curr) => acc + curr.quantityKg, 0);
  const metrics: ImpactMetrics = {
    totalKgSaved: totalKg,
    mealsServed: totalKg * ESG_COEFFICIENTS.MEALS_PER_KG,
    co2AvoidedKg: totalKg * ESG_COEFFICIENTS.CO2_AVOIDED_PER_KG,
    activeDonationsCount: donations.filter((d) => d.status === 'DISPONIVEL').length,
  };

  return (
    <DonationsContext.Provider
      value={{
        donations,
        filteredDonations,
        activeCategory,
        searchQuery,
        isLoading,
        isBackendConnected,
        setCategory: setActiveCategory,
        setSearch: setSearchQuery,
        reserveDonation,
        completeDonation,
        addDonation,
        metrics,
        refreshDonations: fetchDonationsFromApi,
      }}
    >
      {children}
    </DonationsContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationsContext);
  if (!context) {
    throw new Error('useDonations deve ser usado dentro de um DonationsProvider');
  }
  return context;
}

