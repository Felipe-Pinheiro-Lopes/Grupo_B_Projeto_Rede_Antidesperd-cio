export type FoodCategory = 'hortifruti' | 'padaria' | 'refeicao' | 'mercearia';

export type DonationStatus = 'DISPONIVEL' | 'RESERVADO' | 'CONCLUIDO';

export interface Donation {
  id: string;
  title: string;
  category: FoodCategory;
  quantityKg: number;
  donorName: string;
  donorType: string;
  location: string;
  phoneContact: string;
  expiryTime: string;
  status: DonationStatus;
  reservationCode?: string;
  reservedByOng?: string;
  imageUrl?: string;
  description: string;
  createdAt: string;
}

export interface ImpactMetrics {
  totalKgSaved: number;
  mealsServed: number;
  co2AvoidedKg: number;
  activeDonationsCount: number;
}
