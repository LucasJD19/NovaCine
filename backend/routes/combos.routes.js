const express = require("express");
const router = express.Router();
const combosController = require("../controllers/combos.controller");

router.post("/", combosController.crearComboConProductos);
router.get("/", combosController.obtenerCombos);
router.get("/:id/productos", combosController.obtenerProductosDeCombo);

module.exports = router;
