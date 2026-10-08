require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDatabase, query } = require('./config/database');
const donationsRoutes = require('./routes/donationsRoutes');
const metricsRoutes = require('./routes/metricsRoutes');
const seed = require('./seed');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares Globais
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Rota de Boas-Vindas e Health Check
app.get('/', (req, res) => {
  res.json({
    name: 'Rede Antidesperdício - Conexão Fome Zero (API Backend)',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      donations: '/api/donations',
      esgMetrics: '/api/metrics/esg',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Registra as rotas da API
app.use('/api/donations', donationsRoutes);
app.use('/api/metrics', metricsRoutes);

// Endpoint manual de seeding
app.post('/api/seed', async (req, res) => {
  try {
    await seed();
    res.json({ message: 'Banco de dados SQLite populado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao executar o seed de dados.' });
  }
});

// Middleware de tratamento de rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: `Rota não encontrada: ${req.method} ${req.url}` });
});

// Middleware global de tratamento de erros (500)
app.use((err, req, res, next) => {
  console.error('⚠️ Erro interno do servidor:', err);
  res.status(500).json({ error: 'Erro interno no servidor de aplicação.' });
});

// Inicialização do Servidor e Banco SQLite
async function startServer() {
  try {
    await initDatabase();
    console.log('📦 Banco SQLite (rede_antidesperdicio.db) carregado com sucesso.');

    // Verificar se precisa popular banco inicial
    const existing = query('SELECT * FROM donations');
    if (!existing || existing.length === 0) {
      console.log('🌱 Banco vazio detectado. Executando seed de dados iniciais...');
      await seed();
    }

    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
      console.log(`📡 URL base da API: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Erro crítico ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
