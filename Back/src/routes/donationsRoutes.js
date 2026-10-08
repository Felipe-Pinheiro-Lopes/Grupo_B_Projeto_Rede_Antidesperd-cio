const express = require('express');
const router = express.Router();
const donationsController = require('../controllers/donationsController');

// GET /api/donations (Listar doações com filtros)
router.get('/', donationsController.getAllDonations);

// GET /api/donations/:id (Buscar doação por ID)
router.get('/:id', donationsController.getDonationById);

// POST /api/donations (Cadastrar nova doação)
router.post('/', donationsController.createDonation);

// PATCH /api/donations/:id/reserve (Reservar lote por ONG)
router.patch('/:id/reserve', donationsController.reserveDonation);

// PATCH /api/donations/:id/complete (Dar baixa no lote)
router.patch('/:id/complete', donationsController.completeDonation);

module.exports = router;
