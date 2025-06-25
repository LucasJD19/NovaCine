const db = require('../config/db');

const Peliculas = {
  obtenerTodas: (callback) => {
    db.query('SELECT * FROM peliculas', callback);
  },

  obtenerPorId: (id, callback) => {
    db.query('SELECT * FROM peliculas WHERE idPelicula = ?', [id], callback);
  },

  crear: (pelicula, callback) => {
    const { titulo, descripcion, genero, duracion, clasificacion, director, idioma, fechaEstreno, imagen } = pelicula;
    db.query(
      'INSERT INTO peliculas (titulo, descripcion, genero, duracion, clasificacion, director, idioma, fechaEstreno, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [titulo, descripcion, genero, duracion, clasificacion, director, idioma, fechaEstreno, imagen],
      callback
    );
  },

  actualizar: (id, pelicula, callback) => {
    const { titulo, descripcion, genero, duracion, clasificacion, director, idioma, fechaEstreno, imagen } = pelicula;
    db.query(
      'UPDATE peliculas SET titulo = ?, descripcion = ?, genero = ?, duracion = ?, clasificacion = ?, director = ?, idioma = ?, fechaEstreno = ?, imagen = ? WHERE idPelicula = ?',
      [titulo, descripcion, genero, duracion, clasificacion, director, idioma, fechaEstreno, imagen, id],
      callback
    );
  },

  eliminar: (id, callback) => {
    db.query('DELETE FROM peliculas WHERE idPelicula = ?', [id], callback);
  }
};

module.exports = Peliculas;