const db = require('../config/db');

const Provincias = {
  obtenerTodas: (callback) => {
    db.query('SELECT * FROM provincias', callback);
  }
};

module.exports = Provincias;