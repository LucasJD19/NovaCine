const db = require('../config/db');

const CarritoItems = {
  agregarItem: (item, callback) => {
    const { idCarrito, tipo, idReferencia, cantidad } = item;
    db.query(
      'INSERT INTO carrito_items (idCarrito, tipo, idReferencia, cantidad) VALUES (?, ?, ?, ?)',
      [idCarrito, tipo, idReferencia, cantidad],
      callback
    );
  },

  obtenerItemsPorCarrito: (idCarrito, callback) => {
    db.query('SELECT * FROM carrito_items WHERE idCarrito = ?', [idCarrito], callback);
  },

  eliminarItem: (idItem, callback) => {
    db.query('DELETE FROM carrito_items WHERE idItem = ?', [idItem], callback);
  }
};

module.exports = CarritoItems;
