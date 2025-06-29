const db = require("../config/db");

const Pagos = {
    registrarPago: (pago, callback) => {
        const {
            idUsuario,
            total,
            fechaPago,
            tarjeta_nombre,
            tarjeta_numero,
            tarjeta_vencimiento,
            tarjeta_cvv
        } = pago;

        db.query(
            `INSERT INTO pagos 
       (idUsuario, total, fechaPago, tarjeta_nombre, tarjeta_numero, tarjeta_vencimiento, tarjeta_cvv) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [idUsuario, total, fechaPago, tarjeta_nombre, tarjeta_numero, tarjeta_vencimiento, tarjeta_cvv],
            callback
        );
    },

    obtenerPagosPorUsuario: (idUsuario, callback) => {
        db.query("SELECT * FROM pagos WHERE idUsuario = ?", [idUsuario], callback);
    }
};

module.exports = Pagos;
