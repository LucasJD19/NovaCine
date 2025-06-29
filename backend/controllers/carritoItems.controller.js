const CarritoItems = require('../models/carritoItems.model');

exports.agregarItem = (req, res) => {
  CarritoItems.agregarItem(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al agregar ítem' });
    res.status(201).json({ mensaje: 'Ítem agregado', idItem: result.insertId });
  });
};

exports.obtenerItems = (req, res) => {
  const { idCarrito } = req.params;
  CarritoItems.obtenerItemsPorCarrito(idCarrito, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener ítems' });
    res.json(result);
  });
};

exports.eliminarItem = (req, res) => {
  const { idItem } = req.params;
  CarritoItems.eliminarItem(idItem, (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar ítem' });
    res.json({ mensaje: 'Ítem eliminado' });
  });
};
