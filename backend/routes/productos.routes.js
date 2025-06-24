const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productos.controller");

// Rutas
router.get("/", productosController.obtenerProductos);
router.get("/:id", productosController.obtenerProductoPorId);
router.post("/", productosController.crearProducto);
router.put("/:id", productosController.actualizarProducto);
router.delete("/:id", productosController.eliminarProducto);
router.put("/:id/actualizar-stock", productosController.actualizarStockProducto);
router.put("/:id/aumentar-stock", productosController.aumentarStockProducto);


module.exports = router;