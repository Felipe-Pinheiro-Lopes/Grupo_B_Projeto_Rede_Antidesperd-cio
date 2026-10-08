const { initDatabase, run, query } = require('./config/database');

const SEED_DONATIONS = [
  {
    id: 'lote-1',
    title: 'Caixa de Tomates Maduros e Folhagens Frescas',
    category: 'hortifruti',
    quantity_kg: 25,
    donor_name: 'Barraca do Seu Zé',
    donor_type: 'Feirante',
    location: 'Rua França Pinto, 450 (Feira Vila Mariana)',
    phone_contact: '(11) 98765-4321',
    expiry_time: 'Hoje até 14:15',
    status: 'DISPONIVEL',
    description: 'Tomates em estágio avançado de maturação, excelentes para molhos, alfaces e rúculas frescas colhidas ontem.',
    image_url: '🍅🥬'
  },
  {
    id: 'lote-2',
    title: 'Pães Franceses e Broas do Dia Anterior',
    category: 'padaria',
    quantity_kg: 18,
    donor_name: 'Padaria Estrela do Bairro',
    donor_type: 'Padaria',
    location: 'Rua Treze de Maio, 820 (Bela Vista)',
    phone_contact: '(11) 97654-3210',
    expiry_time: 'Hoje até 16:00',
    status: 'DISPONIVEL',
    description: 'Cestas de pães do turno da manhã ainda crocantes e próprios para consumo imediato ou torradas.',
    image_url: '🥖🥐'
  },
  {
    id: 'lote-3',
    title: 'Marmitas Seladas de Arroz, Feijão e Legumes',
    category: 'refeicao',
    quantity_kg: 20,
    donor_name: 'Restaurante Sabor da Terra',
    donor_type: 'Restaurante',
    location: 'Av. Bernardino de Campos, 110 (Paraíso)',
    phone_contact: '(11) 96543-2109',
    expiry_time: 'Hoje até 14:00',
    status: 'DISPONIVEL',
    description: '35 marmitas prontas higienizadas mantidas em balcão térmico após o almoço comercial.',
    image_url: '🍲🥘'
  },
  {
    id: 'lote-4',
    title: 'Sacos de Bananas Prata e Mamões Maduros',
    category: 'hortifruti',
    quantity_kg: 30,
    donor_name: 'Feirante Dona Cida',
    donor_type: 'Feirante',
    location: 'Praça Charles Miller (Feira Pacaembu)',
    phone_contact: '(11) 95432-1098',
    expiry_time: 'Hoje até 14:30',
    status: 'DISPONIVEL',
    description: 'Frutas maduras com alto teor nutritivo, perfeitas para sobremesas, sucos ou papas em creches e lares.',
    image_url: '🍌🥭'
  },
  {
    id: 'lote-5',
    title: 'Fardos de Cenouras e Beterrabas Imperfeitas',
    category: 'hortifruti',
    quantity_kg: 40,
    donor_name: 'Sacolão da Fartura',
    donor_type: 'Hortifrúti',
    location: 'Rua Teodoro Sampaio, 1400 (Pinheiros)',
    phone_contact: '(11) 94321-0987',
    expiry_time: 'Hoje até 17:00',
    status: 'DISPONIVEL',
    description: 'Legumes tortos ou com imperfeições estéticas que não vão para a gôndola, mas com 100% da polpa fresca.',
    image_url: '🥕🥔'
  }
];

async function seed() {
  console.log('🌱 Inicializando o banco de dados e seeding...');
  await initDatabase();

  const existing = query('SELECT * FROM donations');
  if (existing.length > 0) {
    console.log(`ℹ️ Banco já possui ${existing.length} registros. Limpando para re-seeding...`);
    run('DELETE FROM donations');
  }

  for (const item of SEED_DONATIONS) {
    run(
      `INSERT INTO donations (
        id, title, category, quantity_kg, donor_name, donor_type, location,
        phone_contact, expiry_time, status, description, image_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.id,
        item.title,
        item.category,
        item.quantity_kg,
        item.donor_name,
        item.donor_type,
        item.location,
        item.phone_contact,
        item.expiry_time,
        item.status,
        item.description,
        item.image_url
      ]
    );
  }

  const count = query('SELECT * FROM donations').length;
  console.log(`✅ Seeding concluído com sucesso! ${count} doações ativas no SQLite.`);
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('❌ Erro no seeding:', err);
      process.exit(1);
    });
}

module.exports = seed;
