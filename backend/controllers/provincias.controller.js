const Provincias = require('../models/provincias.model');

const obtenerProvincias = (req, res) => {
  Provincias.obtenerTodas((err, resultados) => {
    if (err) {
      return res.status(500).json({ mensaje: 'Error al obtener provincias', error: err });
    }
    res.json(resultados);
  });
};

module.exports = { obtenerProvincias };