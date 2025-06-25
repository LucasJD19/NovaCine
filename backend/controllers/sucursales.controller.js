const Sucursal = require("../models/sucursales.model");

exports.obtenerSucursales = (req, res) => {
  Sucursal.obtenerTodas((err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al obtener sucursales" });
    res.json(resultados);
  });
};

exports.obtenerSucursalPorId = (req, res) => {
  const id = req.params.id;
  Sucursal.obtenerPorId(id, (err, resultado) => {
    if (err) return res.status(500).json({ error: "Error al obtener la sucursal" });
    res.json(resultado[0]);
  });
};

exports.crearSucursal = (req, res) => {
  const nuevaSucursal = req.body;
  Sucursal.crear(nuevaSucursal, (err, resultado) => {
    if (err) return res.status(500).json({ error: "Error al crear la sucursal" });
    res.status(201).json({ mensaje: "Sucursal creada correctamente", id: resultado.insertId });
  });
};

exports.actualizarSucursal = (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  Sucursal.actualizar(id, datos, (err) => {
    if (err) return res.status(500).json({ error: "Error al actualizar la sucursal" });
    res.json({ mensaje: "Sucursal actualizada correctamente" });
  });
};

exports.eliminarSucursal = (req, res) => {
  const id = req.params.id;
  Sucursal.eliminar(id, (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar la sucursal" });
    res.json({ mensaje: "Sucursal eliminada correctamente" });
  });
};
