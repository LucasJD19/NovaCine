import { useState, useEffect } from 'react';
import { Card, Form, Button } from "react-bootstrap";

const AgregarProducto = ({ onClose, onGuardar }) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState("");

    const handleGuardar = (e) => {
        e.preventDefault();

        const nuevoProducto = {
            nombre,
            descripcion,
            precio,
            stock
        };

        onGuardar(nuevoProducto);
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="modal-backdrop-custom">
            <Card style={{ width: '30rem', maxHeight: '90vh', overflowY: 'auto' }} className="bg-dark text-white text-center">
                <Card.Body>
                    <Form onSubmit={handleGuardar}>
                        <Form.Group className="mb-2">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={2} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="text" value={stock} onChange={(e) => setStock(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="text" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
                        </Form.Group>

                        <div className="d-flex justify-content-between mt-3">
                            <Button variant="success" type="submit">
                                Guardar
                            </Button>
                            <Button variant="secondary" onClick={onClose}>
                                Cancelar
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AgregarProducto;