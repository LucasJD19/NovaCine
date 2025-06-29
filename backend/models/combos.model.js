const db = require("../config/db");

const Combos = {
    crearCombo: (combo, callback) => {
        const { nombre, descripcion, precio, imagen } = combo;
        db.query(
            "INSERT INTO combos (nombre, descripcion, precio, imagen) VALUES (?, ?, ?, ?)",
            [nombre, descripcion, precio, imagen],
            callback
        );
    },

    agregarProductoACombo: (idCombo, productos, callback) => {
        // productos = array de objetos: [{ idProducto, cantidad }, ...]
        const values = productos.map(p => [idCombo, p.idProducto, p.cantidad]);
        db.query(
            "INSERT INTO combo_producto (idCombo, idProducto, cantidad) VALUES ?",
            [values],
            callback
        );
    },

    obtenerTodos: (callback) => {
        db.query("SELECT * FROM combos", callback);
    },

    obtenerProductosDeCombo: (idCombo, callback) => {
        const sql = `
      SELECT cp.idProducto, p.nombre, cp.cantidad, p.precio, p.descripcion, p.imagen
      FROM combo_producto cp
      JOIN productos p ON cp.idProducto = p.idProducto
      WHERE cp.idCombo = ?
    `;
        db.query(sql, [idCombo], callback);
    }
};

module.exports = Combos;
