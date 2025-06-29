import { useState, useEffect } from 'react';
import { Card, Form, Button } from "react-bootstrap";

const AgregarEmpleado = ({ onClose, onGuardar }) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");

    const handleGuardar = (e) => {
        e.preventDefault();

        const nuevoEmpleado = {
            nombre,
            apellido,
            email,
            contrasena,
            rol: "empleado"
        };

        onGuardar(nuevoEmpleado);
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
                        <h2>Agregar empleado</h2>

                        <Form.Group className="mb-2">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                            />
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

export default AgregarEmpleado;
