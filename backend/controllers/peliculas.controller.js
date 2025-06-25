const Peliculas = require("../models/peliculas.model");

exports.obtenerPeliculas = (req, res) => {
  Peliculas.obtenerTodas((err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al obtener películas" });
    res.json(resultados);
  });
};

exports.obtenerPeliculaPorId = (req, res) => {
  const id = req.params.id;
  Peliculas.obtenerPorId(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: "Error al obtener la película" });
    if (resultado.length === 0) return res.status(404).json({ error: "Película no encontrada" });
    res.json(resultado[0]);
  });
};

exports.crearPelicula = (req, res) => {
  const nuevaPelicula = req.body;
  Peliculas.crear(nuevaPelicula, (err, resultado) => {
    if (err) return res.status(500).json({ error: "Error al crear la película" });
    res.status(201).json({ mensaje: "Película creada correctamente", id: resultado.insertId });
  });
};

exports.actualizarPelicula = (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  Peliculas.actualizar(id, datosActualizados, (err) => {
    if (err) return res.status(500).json({ error: "Error al actualizar la película" });
    res.json({ mensaje: "Película actualizada correctamente" });
  });
};

exports.eliminarPelicula = (req, res) => {
  const id = req.params.id;
  Peliculas.eliminar(id, (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar la película" });
    res.json({ mensaje: "Película eliminada correctamente" });
  });
};
