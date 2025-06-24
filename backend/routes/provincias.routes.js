const express = require('express');
const router = express.Router();
const { obtenerProvincias } = require('../controllers/provincias.controller');

router.get('/', obtenerProvincias);

module.exports = router;
