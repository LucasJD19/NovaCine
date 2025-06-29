const Carrito = require('../models/carrito.model');

exports.crearCarrito = (req, res) => {
  const { idUsuario } = req.body;
  Carrito.crearCarrito(idUsuario, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear el carrito' });
    res.status(201).json({ mensaje: 'Carrito creado', idCarrito: result.insertId });
  });
};

exports.obtenerCarritoPorUsuario = (req, res) => {
  const { idUsuario } = req.params;
  Carrito.obtenerCarritoPorUsuario(idUsuario, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el carrito' });
    res.json(result[0] || {});
  });
};
