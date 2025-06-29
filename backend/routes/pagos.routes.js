const express = require("express");
const router = express.Router();
const pagosController = require("../controllers/pagos.controller");
const validarPago = require("../middlewares/validarPago");

// Registrar un nuevo pago
router.post("/", validarPago, pagosController.registrarPago);

// Ver los pagos de un usuario específico
router.get("/:idUsuario", pagosController.obtenerPagosDeUsuario);

module.exports = router;
