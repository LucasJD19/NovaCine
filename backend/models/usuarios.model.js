const db = require("../config/db");

const Usuario = {
  obtenerTodos: (callback) => {
    db.query("SELECT * FROM usuarios", callback);
  },

  obtenerPorId: (id, callback) => {
    db.query("SELECT * FROM usuarios WHERE idUsuario = ?", [id], callback);
  },

  crear: (usuario, callback) => {
    const { nombre, email, contraseña, rol } = usuario;
    db.query(
      "INSERT INTO usuarios (nombre, apellido, email, contraseña, rol) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, email, contraseña, rol || "cliente"],
      callback
    );
  },

  actualizar: (id, usuario, callback) => {
    const { nombre, apellido, email, contraseña, rol } = usuario;
    db.query(
      "UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, contraseña = ?, rol = ? WHERE idUsuario = ?",
      [nombre, apellido, email, contraseña, rol, id],
      callback
    );
  },

  eliminar: (id, callback) => {
    db.query("DELETE FROM usuarios WHERE idUsuario = ?", [id], callback);
  },
};

module.exports = Usuario;