const db = require('../config/db');

const Peliculas = {
  obtenerTodas: (callback) => {
    db.query('SELECT * FROM peliculas', callback);
  },

  obtenerPorId: (id, callback) => {
    db.query('SELECT * FROM peliculas WHERE idPelicula = ?', [id], callback);
  },

  crear: (pelicula, callback) => {
    const { titulo, descripcion, duracion, clasificacion, imagen, imagen_panoramica, trailer} = pelicula;
    console.log("Insertando en DB:", titulo, descripcion, duracion, clasificacion, imagen, imagen_panoramica, trailer);
    db.query(
      'INSERT INTO peliculas (titulo, descripcion, duracion, clasificacion, imagen, imagen_panoramica, trailer) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [titulo, descripcion, duracion, clasificacion, imagen, imagen_panoramica, trailer],
      callback
    );
  },

  actualizar: (id, pelicula, callback) => {
    const { titulo, descripcion, duracion, clasificacion, imagen, imagen_panoramica, trailer} = pelicula;
    console.log("Actualizando en DB:", titulo, descripcion, duracion, clasificacion, imagen, imagen_panoramica, trailer);
    db.query(
      'UPDATE peliculas SET titulo = ?, descripcion = ?,  duracion = ?, clasificacion = ?, imagen = ? , imagen_panoramica = ? , trailer = ? WHERE idPelicula = ?',
      [titulo, descripcion, duracion, clasificacion, imagen, imagen_panoramica, trailer,id],
      callback
    );
  },

  eliminar: (id, callback) => {
    db.query('DELETE FROM peliculas WHERE idPelicula = ?', [id], callback);
  },
  buscarPorNombre: (nombre, callback) => {
    db.query(
      "SELECT * FROM peliculas WHERE LOWER(titulo) LIKE ?",
      [`%${nombre.toLowerCase()}%`],
      callback
    );
  },
};

  

module.exports = Peliculas;