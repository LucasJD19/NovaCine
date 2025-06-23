const Usuario = require("../models/usuarios.model");

// Obtener todos los usuarios
exports.obtenerUsuarios = (req, res) => {
  Usuario.obtenerTodos((err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al obtener usuarios" });
    res.json(resultados);
  });
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = (req, res) => {
  const id = req.params.id;
  Usuario.obtenerPorId(id, (err, resultados) => {
    if (err) return res.status(500).json({ error: "Error al obtener el usuario" });
    if (resultados.length === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
    res.json(resultados[0]);
  });
};

// Crear nuevo usuario
exports.crearUsuario = (req, res) => {
  const nuevoUsuario = req.body;
  Usuario.crear(nuevoUsuario, (err, resultado) => {
    if (err) return res.status(500).json({ error: "Error al crear el usuario" });
    res.status(201).json({ id: resultado.insertId, ...nuevoUsuario });
  });
};

// Actualizar usuario
exports.actualizarUsuario = (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;
  Usuario.actualizar(id, datosActualizados, (err) => {
    if (err) return res.status(500).json({ error: "Error al actualizar el usuario" });
    res.json({ mensaje: "Usuario actualizado correctamente" });
  });
};

// Eliminar usuario
exports.eliminarUsuario = (req, res) => {
  const id = req.params.id;
  Usuario.eliminar(id, (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar el usuario" });
    res.json({ mensaje: "Usuario eliminado correctamente" });
  });
};