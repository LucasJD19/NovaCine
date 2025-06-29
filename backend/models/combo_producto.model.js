const db = require("../config/db");

const ComboProducto = {
    agregarProductoACombo: (idCombo, idProducto, cantidad, callback) => {
        db.query(
            "INSERT INTO combo_producto (idCombo, idProducto, cantidad) VALUES (?, ?, ?)",
            [idCombo, idProducto, cantidad],
            callback
        );
    },

    obtenerProductosPorCombo: (idCombo, callback) => {
        db.query(
            `SELECT cp.*, p.nombre, p.precio
       FROM combo_producto cp
       JOIN productos p ON cp.idProducto = p.idProducto
       WHERE cp.idCombo = ?`,
            [idCombo],
            callback
        );
    }
};

module.exports = ComboProducto;
