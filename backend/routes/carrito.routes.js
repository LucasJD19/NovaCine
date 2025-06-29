const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

router.post('/', carritoController.crearCarrito);
router.get('/:idUsuario', carritoController.obtenerCarritoPorUsuario);

module.exports = router;
