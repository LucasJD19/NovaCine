const db = require("../config/db");

const Usuario = {
  obtenerTodos: (callback) => {
    db.query("SELECT * FROM usuarios", callback);
  },

  obtenerPorId: (id, callback) => {
    db.query("SELECT * FROM usuarios WHERE idUsuario = ?", [id], callback);
  },

  crear: (usuario, callback) => {
    const { nombre, apellido, email, contrasena, rol } = usuario;
    db.query(
      "INSERT INTO usuarios (nombre, apellido, email, contrasena, rol) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, email, contrasena, rol || "cliente"],
      callback
    );
  },

  actualizar: (id, usuario, callback) => {
    const { nombre, apellido, email, contrasena, rol } = usuario;
    db.query(
      "UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, contrasena = ?, rol = ? WHERE idUsuario = ?",
      [nombre, apellido, email, contrasena, rol, id],
      callback
    );
  },

  eliminar: (id, callback) => {
    db.query("DELETE FROM usuarios WHERE idUsuario = ?", [id], callback);
  },
};

module.exports = Usuario;