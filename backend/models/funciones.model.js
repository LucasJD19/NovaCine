const db = require("../config/db");

// Obtener todas las funciones
exports.obtenerTodas = (callback) => {
  const sql = `
    SELECT f.*, p.titulo, s.nombre AS sala, su.nombre AS sucursal, f.idioma, f.precio
    FROM funciones f
    JOIN peliculas p ON f.idPelicula = p.idPelicula
    JOIN salas s ON f.idSala = s.idSala
    JOIN sucursales su ON s.idSucursal = su.idSucursal
  `;
  db.query(sql, callback);
};

// Obtener funciones por id de película
exports.obtenerPorPelicula = (idPelicula, callback) => {
  const sql = `
    SELECT f.idFuncion, f.fechaHora, f.formato, s.nombre AS sala, su.nombre AS sucursal, f.idioma, f.precio
    FROM funciones f
    JOIN salas s ON f.idSala = s.idSala
    JOIN sucursales su ON s.idSucursal = su.idSucursal
    WHERE f.idPelicula = ?
    ORDER BY f.fechaHora ASC
  `;
  db.query(sql, [idPelicula], callback);
};
