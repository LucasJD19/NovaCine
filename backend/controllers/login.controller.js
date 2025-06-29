const db = require("../config/db");

exports.login = (req, res) => {
  const { email, contrasena } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ?";
  db.query(sql, [email], (err, resultados) => {
    if (err) return res.status(500).json({ error: "Error del servidor" });

    if (!resultados.length) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const usuario = resultados[0];

    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const user = {
      idUsuario: usuario.idUsuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      rol: usuario.rol,
    };

    res.json({ user });
  });
};