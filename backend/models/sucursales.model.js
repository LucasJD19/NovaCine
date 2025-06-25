const db = require("../config/db");

const Sucursal = {
  obtenerTodas: (callback) => {
    db.query("SELECT * FROM sucursales", callback);
  },

  obtenerPorId: (id, callback) => {
    db.query("SELECT * FROM sucursales WHERE idSucursal = ?", [id], callback);
  },

  crear: (sucursal, callback) => {
    const { nombre, direccion, idProvincia } = sucursal;
    db.query(
      "INSERT INTO sucursales (nombre, direccion, idProvincia) VALUES (?, ?, ?)",
      [nombre, direccion, idProvincia],
      callback
    );
  },

  actualizar: (id, sucursal, callback) => {
    const { nombre, direccion, idProvincia } = sucursal;
    db.query(
      "UPDATE sucursales SET nombre = ?, direccion = ?, idProvincia = ? WHERE idSucursal = ?",
      [nombre, direccion, idProvincia, id],
      callback
    );
  },

  eliminar: (id, callback) => {
    db.query("DELETE FROM sucursales WHERE idSucursal = ?", [id], callback);
  }
};

module.exports = Sucursal;
