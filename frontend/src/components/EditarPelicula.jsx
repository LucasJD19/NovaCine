import { useState, useEffect } from 'react'
import { Card, Form, Button } from "react-bootstrap"

const EditarPelicula = ({ pelicula, onClose, onGuardar }) => {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [duracion, setDuracion] = useState(0);
    const [clasificacion, setClasificacion] = useState("");
    const [imagen, setImagen] = useState("");
    const [imagen_panoramica, setImagen_panoramica] = useState("")
    const [trailer, setTrailer] = useState("");

    useEffect(() => {
        if (pelicula) {
            setTitulo(pelicula.titulo);
            setDescripcion(pelicula.descripcion);
            setDuracion(pelicula.duracion);
            setClasificacion(pelicula.clasificacion);
            setImagen(pelicula.imagen || "");
            setImagen_panoramica(pelicula.imagen_panoramica || "");
            setTrailer(pelicula.trailer || "");
        }
    }, [pelicula]);

    const handleGuardar = () => {
        const noHayCambios =
            titulo === pelicula.titulo &&
            descripcion === pelicula.descripcion &&
            duracion === pelicula.duracion &&
            clasificacion === pelicula.clasificacion &&
            imagen === (pelicula.imagen || "") &&
            imagen_panoramica === (pelicula.imagen_panoramica || "") &&
            trailer === (pelicula.trailer || "");

        if (noHayCambios) {
            alert("No se hicieron cambios");
            onClose();
            return;
        }

        const datosActualizados = {
            titulo,
            descripcion,
            duracion,
            clasificacion,
            imagen,
            imagen_panoramica,
            trailer
        };

        onGuardar(pelicula.idPelicula, datosActualizados);
        alert("Cambios realizados con éxito");
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!pelicula) return null;

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
                            <Form.Label>URL de Imagen Panorámica</Form.Label>
                            <Form.Control type="text" value={imagen_panoramica} onChange={(e) => setImagen_panoramica(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>URL de Trailer</Form.Label>
                            <Form.Control type="text" value={trailer} onChange={(e) => setTrailer(e.target.value)} />
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
