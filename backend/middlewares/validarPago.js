module.exports = (req, res, next) => {
    const {
        idUsuario,
        total,
        tarjeta_nombre,
        tarjeta_numero,
        tarjeta_vencimiento,
        tarjeta_cvv
    } = req.body;

    if (
        !idUsuario ||
        !total ||
        !tarjeta_nombre ||
        !tarjeta_numero ||
        !tarjeta_vencimiento ||
        !tarjeta_cvv
    ) {
        return res.status(400).json({ error: "Faltan datos obligatorios del pago" });
    }

    // Opcional: validación mínima de número de tarjeta
    if (!/^\d{16}$/.test(tarjeta_numero)) {
        return res.status(400).json({ error: "Número de tarjeta inválido" });
    }

    next();
};
