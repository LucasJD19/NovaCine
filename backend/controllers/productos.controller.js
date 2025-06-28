const Producto = require("../models/productos.model");

// Obtener todos los productos
exports.obtenerProductos = (req, res) => {
  Producto.obtenerTodos((err, resultados) => {
    if (err) {
      console.error("Error al obtener los productos:", err);
      return res.status(500).json({ error: "Error al obtener productos" });
    }
    res.json(resultados);
  });
};

// Obtener un producto por ID
exports.obtenerProductoPorId = (req, res) => {
  const id = req.params.id;
  Producto.obtenerPorId(id, (err, resultados) => {
    if (err) {
      console.error("Error al obtener el producto:", err);
      return res.status(500).json({ error: "Error al obtener el producto" });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json(resultados[0]);
  });
};

// Crear un nuevo producto
exports.crearProducto = (req, res) => {
  const nuevoProducto = req.body;
  Producto.crear(nuevoProducto, (err, resultado) => {
    if (err) {
      console.error("Error al crear el producto:", err);
      return res.status(500).json({ error: "Error al crear el producto" });
    }
    res.status(201).json({ id: resultado.insertId, ...nuevoProducto });
  });
};

// Actualizar un producto
exports.actualizarProducto = (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  Producto.actualizar(id, datosActualizados, (err) => {
    if (err) {
      console.error("Error al actualizar el producto:", err);
      return res.status(500).json({ error: "Error al actualizar el producto" });
    }
    res.json({ mensaje: "Producto actualizado correctamente" });
  });
};

// Eliminar un producto
exports.eliminarProducto = (req, res) => {
  const id = req.params.id;
  Producto.eliminar(id, (err) => {
    if (err) {
      console.error("Error al eliminar el producto:", err);
      return res.status(500).json({ error: "Error al eliminar el producto" });
    }
    res.json({ mensaje: "Producto eliminado correctamente" });
  });
};

// Actualizar el stock de un producto (ejemplo: al vender un producto)
exports.actualizarStockProducto = (req, res) => {
  const id = req.params.id;
  const cantidad = req.body.cantidad; // Asume que la cantidad viene en el body como { cantidad: X }

  Producto.actualizarStock(id, cantidad, (err) => {
    if (err) {
      console.error("Error al actualizar el stock del producto:", err);
      return res.status(500).json({ error: "Error al actualizar el stock del producto" });
    }
    res.json({ mensaje: "Stock del producto actualizado correctamente" });
  });
};

// Aumentar el stock de un producto (ejemplo: al recibir inventario)
exports.aumentarStockProducto = (req, res) => {
  const id = req.params.id;
  const cantidad = req.body.cantidad; // Asume que la cantidad viene en el body como { cantidad: X }

  Producto.aumentarStock(id, cantidad, (err) => {
    if (err) {
      console.error("Error al aumentar el stock del producto:", err);
      return res.status(500).json({ error: "Error al aumentar el stock del producto" });
    }
    res.json({ mensaje: "Stock del producto aumentado correctamente" });
  });
};

exports.buscarPorNombre = (req, res) => {
  const { nombre } = req.query;
  if (!nombre)
    return res.status(400).json({ error: "Falta el parámetro nombre" });

  Producto.buscarPorNombre(nombre, (err, resultados) => {
    if (err)
      return res.status(500).json({ error: "Error en la base de datos" });
    res.json(resultados);
  });
};