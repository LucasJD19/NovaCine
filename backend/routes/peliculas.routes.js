const express = require("express");
const router = express.Router();
const peliculasController = require("../controllers/peliculas.controller");

router.get("/", peliculasController.obtenerPeliculas);
router.get("/buscar", peliculasController.buscarPorNombre);
router.get("/:id", peliculasController.obtenerPeliculaPorId);
router.post("/", peliculasController.crearPelicula);
router.put("/:id", peliculasController.actualizarPelicula);
router.delete("/:id", peliculasController.eliminarPelicula);
router.post("/actualizar-activas", peliculasController.actualizarPeliculasActivas); // ruta del SP activar pelis

module.exports = router;
