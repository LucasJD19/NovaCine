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

  console.log("PELÍCULA RECIBIDA:", nuevaPelicula);

  Peliculas.crear(nuevaPelicula, (err, resultado) => {
    if (err) {
      console.error("Error en la consulta SQL:", err);
      return res.status(500).json({ error: "Error al crear la película" });
    }
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

exports.buscarPorNombre = (req, res) => {
  const nombre = req.query.nombre;
  console.log("Buscando película con nombre:", nombre);
  if (!nombre)
    return res.status(400).json({ error: "Falta el parámetro nombre" });

  Peliculas.buscarPorNombre(nombre, (err, resultados) => {
    if (err)
      return res.status(500).json({ error: "Error en la base de datos" });
    if (resultados.length === 0)
      return res.status(404).json({ error: "Película no encontrada" });

    res.json(resultados);
  });

  // llamada al SP para poder activar las peliculas si las mismas tienen funciones
  exports.actualizarPeliculasActivas = (req, res) => {
    db.query("CALL ActualizarPeliculasActivas()", (err, resultados) => {
      if (err) {
        console.error("Error al ejecutar el procedimiento:", err);
        return res.status(500).json({ error: "Error al actualizar el estado de las películas" });
      }
      res.json({ mensaje: "Estado de películas actualizado correctamente" });
    });
  };
};