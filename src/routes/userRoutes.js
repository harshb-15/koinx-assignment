// src/routes/userRoutes.js

const express = require('express');
const { getStats, getDeviation } = require('../controllers/cryptoController');

const router = express.Router();

router.get('/', getStats);

module.exports = router;
