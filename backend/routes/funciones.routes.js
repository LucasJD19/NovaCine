const express = require("express");
const router = express.Router();
const funcionesController = require("../controllers/funciones.controller");

// Obtener todas las funciones (opcional)
router.get("/", funcionesController.obtenerFunciones);

// Obtener funciones por ID de película
router.get("/pelicula/:idPelicula", funcionesController.obtenerFuncionesPorPelicula);



module.exports = router;
