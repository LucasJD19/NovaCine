import { Modal, ListGroup, Card } from 'react-bootstrap';

const MostrarProducto = ({ producto, onClose }) => {
  if (!producto) return null;
  return (
    <Modal show={true} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>#{producto.idProducto}: {producto.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <Card className="bg-dark text-white text-center border-0">
          <Card.Body>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="mx-auto d-block"
              style={{
                maxHeight: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "10px"
              }}
            />
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-secondary text-white">Descripción: {producto.descripcion}</ListGroup.Item>
              <ListGroup.Item className="bg-secondary text-white">Precio: ${producto.precio}</ListGroup.Item>
              <ListGroup.Item className="bg-secondary text-white">Cantidad en stock: {producto.stock}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  )
}

export default MostrarProducto