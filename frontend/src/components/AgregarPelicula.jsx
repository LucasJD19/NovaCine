import { useState, useEffect } from 'react'
import { Card, Form, Button } from "react-bootstrap"

const AgregarPelicula = ({ onClose, onGuardar }) => {

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [duracion, setDuracion] = useState(0);
    const [clasificacion, setClasificacion] = useState("");
    const [imagen, setImagen] = useState("");
    const [imagenPanoramica, setImagenPanoramica] = useState("");

    const handleGuardar = () => {
        if (!titulo || !descripcion || !duracion || !clasificacion || !imagen) {
            alert("Por favor completá todos los campos obligatorios.");
            return;
        }

        const nuevaPelicula = {
            titulo,
            descripcion,
            duracion,
            clasificacion,
            imagen,
            imagenPanoramica
        };

        onGuardar(nuevaPelicula);
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
                {imagen && <Card.Img variant="top" src={imagen} />}
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={2} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Duración (minutos)</Form.Label>
                            <Form.Control type="number" value={duracion} onChange={(e) => setDuracion(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Clasificación</Form.Label>
                            <Form.Control type="text" value={clasificacion} onChange={(e) => setClasificacion(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>URL de Imagen</Form.Label>
                            <Form.Control type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Imagen Panorámica</Form.Label>
                            <Form.Control type="text" value={imagenPanoramica} onChange={(e) => setImagenPanoramica(e.target.value)} />
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

export default AgregarPelicula;
