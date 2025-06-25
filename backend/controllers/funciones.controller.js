const Funcion = require("../models/funciones.model");

// Obtener todas las funciones (opcional)
exports.obtenerFunciones = (req, res) => {
  Funcion.obtenerTodas((err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al obtener funciones" });
    res.json(resultados);
  });
};

// Obtener funciones por ID de película
exports.obtenerFuncionesPorPelicula = (req, res) => {
  const idPelicula = req.params.idPelicula;
  Funcion.obtenerPorPelicula(idPelicula, (err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al obtener funciones de la película" });
    res.json(resultados);
  });
};
