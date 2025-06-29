import { Modal, ListGroup, Card } from 'react-bootstrap';

const MostrarEmpleado = ({ producto, onClose }) => {
    if (!producto) return null;

    return (
        <Modal show={true} onHide={onClose} centered backdrop="static">
            <Modal.Header closeButton className="bg-dark text-white">
                <Modal.Title>#{producto.idUsuario}: {producto.nombre} {producto.apellido}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                <Card className="bg-dark text-white text-center border-0">
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="bg-secondary text-white">Email: {producto.email}</ListGroup.Item>
                            <ListGroup.Item className="bg-secondary text-white">Contraseña: {producto.contrasena}</ListGroup.Item>
                            <ListGroup.Item className="bg-secondary text-white">Rol: {producto.rol}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    );
};

export default MostrarEmpleado;
