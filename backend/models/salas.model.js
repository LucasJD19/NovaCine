const db = require("../config/db");

const Sala = {
  obtenerTodas: (callback) => {
    db.query("SELECT * FROM salas", callback);
  },

  obtenerPorSucursal: (idSucursal, callback) => {
    db.query("SELECT * FROM salas WHERE idSucursal = ?", [idSucursal], callback);
  },

  obtenerPorId: (id, callback) => {
    db.query("SELECT * FROM salas WHERE idSala = ?", [id], callback);
  }
};

module.exports = Sala;
