const db = require('../config/db');

const Carrito = {
  crearCarrito: (idUsuario, callback) => {
    db.query('INSERT INTO carrito (idUsuario) VALUES (?)', [idUsuario], callback);
  },

  obtenerCarritoPorUsuario: (idUsuario, callback) => {
    db.query('SELECT * FROM carrito WHERE idUsuario = ?', [idUsuario], callback);
  }
};

module.exports = Carrito;
