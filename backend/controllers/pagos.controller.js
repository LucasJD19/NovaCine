const Pagos = require("../models/pagos.model");

exports.registrarPago = (req, res) => {
    const nuevoPago = {
        ...req.body,
        fechaPago: new Date() // Usa fecha actual del servidor
    };

    Pagos.registrarPago(nuevoPago, (err, resultado) => {
        if (err) {
            console.error("Error al registrar pago:", err);
            return res.status(500).json({ error: "Error al registrar el pago" });
        }

        res.status(201).json({ mensaje: "Pago registrado correctamente", idPago: resultado.insertId });
    });
};

exports.obtenerPagosDeUsuario = (req, res) => {
    const idUsuario = req.params.idUsuario;

    Pagos.obtenerPagosPorUsuario(idUsuario, (err, resultados) => {
        if (err) {
            console.error("Error al obtener pagos:", err);
            return res.status(500).json({ error: "Error al obtener pagos del usuario" });
        }

        res.json(resultados);
    });
};
