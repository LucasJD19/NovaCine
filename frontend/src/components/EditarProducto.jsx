import { useState, useEffect } from 'react'
import { Card, Form, Button } from "react-bootstrap"

const EditarPelicula = ({ producto, onClose, onGuardar }) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState("");

    useEffect(() => {
        if (producto) {
            setNombre(producto.nombre);
            setDescripcion(producto.descripcion);
            setPrecio(producto.precio);
            setStock(producto.stock || "");
        }
    }, [producto]);

    const handleGuardar = () => {
        const noHayCambios =
            nombre === producto.nombre &&
            descripcion === producto.descripcion &&
            precio === producto.precio &&
            stock === (producto.stock || "");

        if (noHayCambios) {
            alert("No se hicieron cambios");
            onClose();
            return;
        }

        const datosActualizados = {
            nombre,
            descripcion,
            precio,
            stock
        };

        onGuardar(producto.idProducto, datosActualizados);
        alert("Cambios realizados con éxito");
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!producto) return null;

    return (
        <div className="modal-backdrop-custom">
            <Card style={{ width: '30rem', maxHeight: '90vh', overflowY: 'auto' }} className="bg-dark text-white text-center">
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={2} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="text" value={stock} onChange={(e) => setStock(e.target.value)} />
                        </Form.Group>
                    </Form>

                    <div className="d-flex justify-content-between mt-3">
                        <Button variant="success" onClick={handleGuardar}>
                            Guardar
                        </Button>
                        <Button variant="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EditarPelicula;
