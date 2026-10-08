const db = require('../config/database');
const { generateReservationCode, mapDonationToDTO } = require('../utils/codeGenerator');

// GET /api/donations (Card 37) - Listar doações com suporte a filtros
function getAllDonations(req, res) {
  try {
    const { category, status, search, donorName, reservedByOng, limit } = req.query;

    let sql = 'SELECT * FROM donations WHERE 1=1';
    const params = [];

    if (category && category !== 'todos') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (donorName) {
      sql += ' AND donor_name LIKE ?';
      params.push(`%${donorName}%`);
    }

    if (reservedByOng) {
      sql += ' AND reserved_by_ong LIKE ?';
      params.push(`%${reservedByOng}%`);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR location LIKE ? OR donor_name LIKE ? OR description LIKE ?)';
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    sql += ' ORDER BY created_at DESC';

    if (limit && !isNaN(Number(limit))) {
      sql += ' LIMIT ?';
      params.push(Number(limit));
    }

    const rows = db.query(sql, params);
    const donations = rows.map(mapDonationToDTO);

    return res.json(donations);
  } catch (error) {
    console.error('Erro ao buscar doações:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar doações.' });
  }
}

// GET /api/donations/:id - Buscar doação por ID
function getDonationById(req, res) {
  try {
    const { id } = req.params;
    const row = db.get('SELECT * FROM donations WHERE id = ?', [id]);

    if (!row) {
      return res.status(404).json({ error: 'Doação não encontrada.' });
    }

    return res.json(mapDonationToDTO(row));
  } catch (error) {
    console.error('Erro ao buscar doação por ID:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar lote.' });
  }
}

// POST /api/donations (Card 38) - Cadastrar nova doação de alimentos
function createDonation(req, res) {
  try {
    const {
      title,
      category,
      quantityKg,
      donorName,
      donorType,
      location,
      phoneContact,
      expiryTime,
      description,
      imageUrl
    } = req.body;

    if (!title || !category || !quantityKg || !donorName || !location || !expiryTime) {
      return res.status(400).json({
        error: 'Campos obrigatórios ausentes. Informe title, category, quantityKg, donorName, location e expiryTime.'
      });
    }

    const id = `lote-${Date.now()}`;
    const status = 'DISPONIVEL';
    const createdAt = new Date().toISOString();

    db.run(
      `INSERT INTO donations (
        id, title, category, quantity_kg, donor_name, donor_type, location,
        phone_contact, expiry_time, status, description, image_url, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title,
        category,
        Number(quantityKg),
        donorName,
        donorType || 'Feirante',
        location,
        phoneContact || '(11) 98765-4321',
        expiryTime,
        status,
        description || '',
        imageUrl || '🍎',
        createdAt
      ]
    );

    const inserted = db.get('SELECT * FROM donations WHERE id = ?', [id]);
    return res.status(201).json(mapDonationToDTO(inserted));
  } catch (error) {
    console.error('Erro ao cadastrar doação:', error);
    return res.status(500).json({ error: 'Erro interno ao cadastrar doação.' });
  }
}

// PATCH /api/donations/:id/reserve (Card 39) - Reservar lote para ONG e gerar código
function reserveDonation(req, res) {
  try {
    const { id } = req.params;
    const { reservedByOng } = req.body;

    const donation = db.get('SELECT * FROM donations WHERE id = ?', [id]);

    if (!donation) {
      return res.status(404).json({ error: 'Lote de doação não encontrado.' });
    }

    if (donation.status === 'CONCLUIDO') {
      return res.status(400).json({ error: 'Este lote já foi concluído e retirado.' });
    }

    const code = generateReservationCode();
    const ongName = reservedByOng || 'ONG Parceira Fome Zero';

    db.run(
      `UPDATE donations 
       SET status = 'RESERVADO', reservation_code = ?, reserved_by_ong = ?
       WHERE id = ?`,
      [code, ongName, id]
    );

    const updated = db.get('SELECT * FROM donations WHERE id = ?', [id]);
    return res.json({
      message: 'Reserva realizada com sucesso!',
      reservationCode: code,
      donation: mapDonationToDTO(updated)
    });
  } catch (error) {
    console.error('Erro ao reservar doação:', error);
    return res.status(500).json({ error: 'Erro interno ao reservar doação.' });
  }
}

// PATCH /api/donations/:id/complete - Dar baixa na doação via código de resgate
function completeDonation(req, res) {
  try {
    const { id } = req.params;
    const { code } = req.body;

    const donation = db.get('SELECT * FROM donations WHERE id = ?', [id]);

    if (!donation) {
      return res.status(404).json({ error: 'Lote de doação não encontrado.' });
    }

    if (code && donation.reservation_code && donation.reservation_code !== code) {
      return res.status(400).json({ error: 'Código de resgate incorreto.' });
    }

    db.run(
      `UPDATE donations SET status = 'CONCLUIDO' WHERE id = ?`,
      [id]
    );

    const updated = db.get('SELECT * FROM donations WHERE id = ?', [id]);
    return res.json({
      message: 'Doação concluída com sucesso! Impacto computado no painel ESG.',
      donation: mapDonationToDTO(updated)
    });
  } catch (error) {
    console.error('Erro ao concluir doação:', error);
    return res.status(500).json({ error: 'Erro interno ao concluir doação.' });
  }
}

module.exports = {
  getAllDonations,
  getDonationById,
  createDonation,
  reserveDonation,
  completeDonation
};
