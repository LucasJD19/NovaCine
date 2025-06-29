import { useState, useEffect } from 'react';
import { Card, Form, Button } from "react-bootstrap";

const EditarEmpleado = ({ producto, onClose, onGuardar }) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");

    useEffect(() => {
        if (producto) {
            setNombre(producto.nombre || "");
            setApellido(producto.apellido || "");
            setEmail(producto.email || "");
            setContrasena(producto.contrasena || "");
        }
    }, [producto]);

    const handleGuardar = (e) => {
        e.preventDefault(); // ✅ esto es fundamental

        const noHayCambios =
            nombre === producto.nombre &&
            apellido === producto.apellido &&
            email === producto.email &&
            contrasena === producto.contrasena;

        if (noHayCambios) {
            alert("No se hicieron cambios");
            onClose();
            return;
        }

        const datosActualizados = {
            nombre,
            apellido,
            email,
            contrasena,
            rol: "empleado"
        };

        onGuardar(producto.idUsuario, datosActualizados);
        // ❌ NO pongas alert acá porque eso ya está en CrudEmpleados
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
                    <Form onSubmit={handleGuardar}> {/* ✅ form se maneja por submit */}
                        <Form.Group className="mb-2">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="text" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                        </Form.Group>

                        <div className="d-flex justify-content-between mt-3">
                            <Button variant="success" type="submit"> {/* ✅ Submit con Enter */}
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

export default EditarEmpleado;
