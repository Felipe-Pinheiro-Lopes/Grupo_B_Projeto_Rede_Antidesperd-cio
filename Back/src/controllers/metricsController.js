const db = require('../config/database');

const ESG_COEFFICIENTS = {
  MEALS_PER_KG: 2,           // 1 kg = 2 refeições nutritivas (400-500g)
  CO2_AVOIDED_PER_KG: 2.5,   // 1 kg = 2.5 kg CO2e evitado (fonte WRAP/FAO)
};

// GET /api/metrics/esg (Card 40) - Cálculo agregado de impacto socioambiental ESG
function getEsgMetrics(req, res) {
  try {
    const donations = db.query('SELECT * FROM donations WHERE 1=1');

    // Total de kg salvos
    const totalKgSaved = donations.reduce((acc, curr) => acc + (Number(curr.quantity_kg) || 0), 0);

    // Contagem por status
    const activeDonationsCount = donations.filter((d) => d.status === 'DISPONIVEL').length;
    const reservedDonationsCount = donations.filter((d) => d.status === 'RESERVADO').length;
    const completedDonationsCount = donations.filter((d) => d.status === 'CONCLUIDO').length;

    // Breakdown por Categoria
    const categories = ['hortifruti', 'padaria', 'refeicao', 'mercearia'];
    const categoryBreakdown = categories.map((cat) => {
      const catDonations = donations.filter((d) => d.category === cat);
      const catKg = catDonations.reduce((acc, curr) => acc + (Number(curr.quantity_kg) || 0), 0);
      return {
        category: cat,
        totalKg: catKg,
        percentage: totalKgSaved > 0 ? Number(((catKg / totalKgSaved) * 100).toFixed(1)) : 0,
        count: catDonations.length
      };
    });

    // Ranking dos principais doadores
    const donorMap = {};
    donations.forEach((d) => {
      const key = d.donor_name || 'Desconhecido';
      if (!donorMap[key]) {
        donorMap[key] = {
          donorName: key,
          donorType: d.donor_type || 'Feirante',
          totalKg: 0
        };
      }
      donorMap[key].totalKg += Number(d.quantity_kg) || 0;
    });

    const topDonors = Object.values(donorMap)
      .sort((a, b) => b.totalKg - a.totalKg)
      .slice(0, 5);

    const mealsServed = Math.round(totalKgSaved * ESG_COEFFICIENTS.MEALS_PER_KG);
    const co2AvoidedKg = Number((totalKgSaved * ESG_COEFFICIENTS.CO2_AVOIDED_PER_KG).toFixed(1));

    return res.json({
      totalKgSaved,
      mealsServed,
      co2AvoidedKg,
      activeDonationsCount,
      reservedDonationsCount,
      completedDonationsCount,
      totalDonationsCount: donations.length,
      coefficients: ESG_COEFFICIENTS,
      categoryBreakdown,
      topDonors
    });
  } catch (error) {
    console.error('Erro ao calcular métricas ESG:', error);
    return res.status(500).json({ error: 'Erro interno ao calcular métricas ESG.' });
  }
}

module.exports = {
  getEsgMetrics
};
