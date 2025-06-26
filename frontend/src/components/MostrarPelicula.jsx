import React from 'react';
import { Modal, Card, ListGroup, Button } from 'react-bootstrap';

const MostrarPelicula = ({ pelicula, onClose }) => {
    if (!pelicula) return null;

    return (
        <Modal show={true} onHide={onClose} centered backdrop="static">
            <Modal.Header closeButton className="bg-dark text-white">
                <Modal.Title>#{pelicula.idPelicula}: {pelicula.titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                <Card className="bg-dark text-white text-center border-0">
                    <Card.Img variant="top" src={pelicula.imagen} style={{ maxHeight: '250px', objectFit: 'contain' }} />
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="bg-secondary text-white">Duración: {pelicula.duracion} min</ListGroup.Item>
                            <ListGroup.Item className="bg-secondary text-white">Clasificación: {pelicula.clasificacion}</ListGroup.Item>
                            <ListGroup.Item className="bg-secondary text-white">{pelicula.descripcion}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    );
};

export default MostrarPelicula;
