const Sala = require("../models/salas.model");

exports.obtenerSalas = (req, res) => {
  Sala.obtenerTodas((err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al obtener salas" });
    res.json(resultados);
  });
};

exports.obtenerSalaPorId = (req, res) => {
  const id = req.params.id;
  Sala.obtenerPorId(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: "Error al obtener la sala" });
    res.json(resultado[0]);
  });
};

exports.obtenerSalasPorSucursal = (req, res) => {
  const idSucursal = req.params.idSucursal;
  Sala.obtenerPorSucursal(idSucursal, (err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al obtener salas por sucursal" });
    res.json(resultados);
  });
};
