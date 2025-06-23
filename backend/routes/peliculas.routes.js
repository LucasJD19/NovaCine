const express = require('express');
const router = express.Router();
const { obtenerPeliculas } = require('../controllers/peliculas.controller');

router.get('/', obtenerPeliculas);

module.exports = router;
