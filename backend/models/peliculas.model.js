const db = require('../config/db');

const Peliculas = {
  obtenerTodas: (callback) => {
    db.query('SELECT * FROM peliculas', callback);
  }
};

module.exports = Peliculas;
