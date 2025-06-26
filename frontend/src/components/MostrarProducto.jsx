import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';


const MostrarProducto = () => {
  return (
    <div>
      <Card style={{ width: '18rem' }} className="bg-dark text-white text-center">
        <Card.Img variant="top" src="../../public/images/Pochoclera.png" />
        <Card.Body>
          <Card.Title>Nombre</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item className="bg-secondary text-white">precio</ListGroup.Item>
          <ListGroup.Item className="bg-secondary text-white">cantidad</ListGroup.Item>
          <ListGroup.Item className="bg-secondary text-white">mas atributos</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <button className="btn btn-outline-light">botón que hace algo</button>
        </Card.Body>
      </Card>
      <button>Volver</button>
    </div>
  )
}

export default MostrarProducto