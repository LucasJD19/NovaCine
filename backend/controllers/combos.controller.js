const Combos = require("../models/combos.model");

exports.crearComboConProductos = (req, res) => {
    const { nombre, descripcion, precio, imagen, productos } = req.body;

    if (!productos || productos.length === 0) {
        return res.status(400).json({ error: "El combo debe incluir al menos un producto" });
    }

    const nuevoCombo = { nombre, descripcion, precio, imagen };

    // Primero insertamos el combo
    Combos.crearCombo(nuevoCombo, (err, resultado) => {
        if (err) {
            console.error("Error al crear combo:", err);
            return res.status(500).json({ error: "Error al crear combo" });
        }

        const idCombo = resultado.insertId;

        // Luego, insertamos los productos en combo_producto
        Combos.agregarProductoACombo(idCombo, productos, (err2) => {
            if (err2) {
                console.error("Error al agregar productos al combo:", err2);
                return res.status(500).json({ error: "Error al vincular productos al combo" });
            }

            res.status(201).json({ mensaje: "Combo y productos vinculados correctamente", idCombo });
        });
    });
};

exports.obtenerCombos = (req, res) => {
    Combos.obtenerTodos((err, resultados) => {
        if (err) return res.status(500).json({ error: "Error al obtener combos" });
        res.json(resultados);
    });
};

exports.obtenerProductosDeCombo = (req, res) => {
    const id = req.params.id;
    Combos.obtenerProductosDeCombo(id, (err, resultados) => {
        if (err) return res.status(500).json({ error: "Error al obtener productos del combo" });
        res.json(resultados);
    });
};
