const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metricsController');

// GET /api/metrics/esg (Card 40)
router.get('/esg', metricsController.getEsgMetrics);

module.exports = router;
