const ComboProducto = require("../models/combo_producto.model");

exports.agregarProducto = (req, res) => {
  const { idCombo, idProducto, cantidad } = req.body;

  if (!idCombo || !idProducto || !cantidad) {
    return res.status(400).json({ error: "Faltan datos necesarios" });
  }

  ComboProducto.agregarProductoACombo(idCombo, idProducto, cantidad, (err, resultado) => {
    if (err) {
      console.error("Error al agregar producto al combo:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.status(201).json({ mensaje: "Producto agregado al combo correctamente", id: resultado.insertId });
  });
};

exports.obtenerPorCombo = (req, res) => {
  const idCombo = req.params.idCombo;

  ComboProducto.obtenerProductosPorCombo(idCombo, (err, resultados) => {
    if (err) {
      console.error("Error al obtener productos del combo:", err);
      return res.status(500).json({ error: "Error al obtener productos del combo" });
    }
    res.json(resultados);
  });
};
