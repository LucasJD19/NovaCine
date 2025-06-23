const Peliculas = require('../models/peliculas.model');

const obtenerPeliculas = (req, res) => {
  Peliculas.obtenerTodas((err, resultados) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener películas', error: err });
    }
    res.json(resultados);
  });
};

module.exports = { obtenerPeliculas };
