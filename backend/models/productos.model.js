const db = require("../config/db");

const Producto = {
  obtenerTodos: (callback) => {
    db.query("SELECT * FROM productos", callback);
  },

  obtenerPorId: (id, callback) => {
    db.query("SELECT * FROM productos WHERE idProducto = ?", [id], callback);
  },

  crear: (producto, callback) => {
    const { nombre, descripcion, precio, stock, imagen } = producto;
    db.query(
      "INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)",
      [nombre, descripcion, precio, stock, imagen],
      callback
    );
  },

  actualizar: (id, producto, callback) => {
    const { nombre, descripcion, precio, stock, imagen } = producto;
    db.query(
      "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ? WHERE idProducto = ?",
      [nombre, descripcion, precio, stock, imagen, id],
      callback
    );
  },  

  eliminar: (id, callback) => {
    db.query("DELETE FROM productos WHERE idProducto = ?", [id], callback);
  },

  actualizarStock: (id, cantidad, callback) => {
    db.query("UPDATE productos SET stock = stock - ? WHERE idProducto = ?", [cantidad, id], callback);
  },

  aumentarStock: (id, cantidad, callback) => {
    db.query("UPDATE productos SET stock = stock + ? WHERE idProducto = ?", [cantidad, id], callback);
  },

  buscarPorNombre: (nombre, callback) => {
    db.query(
      "SELECT * FROM productos WHERE LOWER(nombre) LIKE ?",
      [`%${nombre.toLowerCase()}%`],
      callback
    );
  }
};


module.exports = Producto;