import { Donation } from '@/types/donation';

export const INITIAL_DONATIONS: Donation[] = [
  {
    id: 'lote-1',
    title: 'Caixa de Tomates Maduros e Folhagens Frescas',
    category: 'hortifruti',
    quantityKg: 25,
    donorName: 'Barraca do Seu Zé',
    donorType: 'Feirante',
    location: 'Rua França Pinto, 450 (Feira Vila Mariana)',
    phoneContact: '(11) 98765-4321',
    expiryTime: 'Hoje até 14:15',
    status: 'DISPONIVEL',
    description: 'Tomates em estágio avançado de maturação, excelentes para molhos, alfaces e rúculas frescas colhidas ontem.',
    imageUrl: '🍅🥬',
    createdAt: new Date().toISOString()
  },
  {
    id: 'lote-2',
    title: 'Pães Franceses e Broas do Dia Anterior',
    category: 'padaria',
    quantityKg: 18,
    donorName: 'Padaria Estrela do Bairro',
    donorType: 'Padaria',
    location: 'Rua Treze de Maio, 820 (Bela Vista)',
    phoneContact: '(11) 97654-3210',
    expiryTime: 'Hoje até 16:00',
    status: 'DISPONIVEL',
    description: 'Cestas de pães do turno da manhã ainda crocantes e próprios para consumo imediato ou torradas.',
    imageUrl: '🥖🥐',
    createdAt: new Date().toISOString()
  },
  {
    id: 'lote-3',
    title: 'Marmitas Seladas de Arroz, Feijão e Legumes',
    category: 'refeicao',
    quantityKg: 20,
    donorName: 'Restaurante Sabor da Terra',
    donorType: 'Restaurante',
    location: 'Av. Bernardino de Campos, 110 (Paraíso)',
    phoneContact: '(11) 96543-2109',
    expiryTime: 'Hoje até 14:00',
    status: 'DISPONIVEL',
    description: '35 marmitas prontas higienizadas mantidas em balcão térmico após o almoço comercial.',
    imageUrl: '🍲🥘',
    createdAt: new Date().toISOString()
  },
  {
    id: 'lote-4',
    title: 'Sacos de Bananas Prata e Mamões Maduros',
    category: 'hortifruti',
    quantityKg: 30,
    donorName: 'Feirante Dona Cida',
    donorType: 'Feirante',
    location: 'Praça Charles Miller (Feira Pacaembu)',
    phoneContact: '(11) 95432-1098',
    expiryTime: 'Hoje até 14:30',
    status: 'DISPONIVEL',
    description: 'Frutas maduras com alto teor nutritivo, perfeitas para sobremesas, sucos ou papas em creches e lares.',
    imageUrl: '🍌🥭',
    createdAt: new Date().toISOString()
  },
  {
    id: 'lote-5',
    title: 'Fardos de Cenouras e Beterrabas Imperfeitas',
    category: 'hortifruti',
    quantityKg: 40,
    donorName: 'Sacolão da Fartura',
    donorType: 'Hortifrúti',
    location: 'Rua Teodoro Sampaio, 1400 (Pinheiros)',
    phoneContact: '(11) 94321-0987',
    expiryTime: 'Hoje até 17:00',
    status: 'DISPONIVEL',
    description: 'Legumes tortos ou com imperfeições estéticas que não vão para a gôndola, mas com 100% da polpa fresca.',
    imageUrl: '🥕🥔',
    createdAt: new Date().toISOString()
  }
];

export const ESG_COEFFICIENTS = {
  MEALS_PER_KG: 2,           // 1 kg = 2 refeições nutritivas (400-500g cada)
  CO2_AVOIDED_PER_KG: 2.5,   // 1 kg = 2.5 kg de CO2e evitado (fonte WRAP/FAO)
};
