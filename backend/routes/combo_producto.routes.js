const express = require("express");
const router = express.Router();
const controller = require("../controllers/combo_producto.controller");

router.post("/", controller.agregarProducto);
router.get("/:idCombo", controller.obtenerPorCombo);

module.exports = router;
