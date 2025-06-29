const express = require('express');
const router = express.Router();
const carritoItemsController = require('../controllers/carritoItems.controller');

router.post('/', carritoItemsController.agregarItem);
router.get('/:idCarrito', carritoItemsController.obtenerItems);
router.delete('/:idItem', carritoItemsController.eliminarItem);

module.exports = router;
