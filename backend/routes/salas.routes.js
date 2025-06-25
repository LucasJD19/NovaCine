const express = require("express");
const router = express.Router();
const salasController = require("../controllers/salas.controller");

router.get("/", salasController.obtenerSalas); // Todas las salas
router.get("/:id", salasController.obtenerSalaPorId); // Sala por ID
router.get("/sucursal/:idSucursal", salasController.obtenerSalasPorSucursal); // Salas por sucursal

module.exports = router;
