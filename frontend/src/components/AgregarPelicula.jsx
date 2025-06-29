import { useState, useEffect } from 'react';
import { Card, Form, Button } from "react-bootstrap";

const AgregarPelicula = ({ onClose, onGuardar }) => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [duracion, setDuracion] = useState(0);
    const [clasificacion, setClasificacion] = useState("");
    const [imagen, setImagen] = useState("");
    const [imagen_panoramica, setImagen_panoramica] = useState("");
    const [trailer, setTrailer] = useState("");

    const handleGuardar = (e) => {
        e.preventDefault();

        const nuevaPelicula = {
            titulo,
            descripcion,
            duracion,
            clasificacion,
            imagen,
            imagen_panoramica,
            trailer
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
                <br /><h2>Agregrar pelicula</h2>
                {imagen && <Card.Img variant="top" src={imagen} />}
                <Card.Body>
                    <Form onSubmit={handleGuardar}>
                        <Form.Group className="mb-2">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={2} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Duración (minutos)</Form.Label>
                            <Form.Control type="number" value={duracion} onChange={(e) => setDuracion(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Clasificación</Form.Label>
                            <Form.Control type="text" value={clasificacion} onChange={(e) => setClasificacion(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>URL de Imagen</Form.Label>
                            <Form.Control type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} required />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>URL de Imagen Panorámica</Form.Label>
                            <Form.Control type="text" value={imagen_panoramica} onChange={(e) => setImagen_panoramica(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>URL del Trailer</Form.Label>
                            <Form.Control type="text" value={trailer} onChange={(e) => setTrailer(e.target.value)} required />
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

export default AgregarPelicula;