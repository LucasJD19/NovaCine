import { Nav } from "react-bootstrap";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import CrudPeliculas from "../components/CrudPeliculas";
import CrudProductos from "../components/CrudProductos";
import CrudEmpleados from "../components/CrudEmpleados";
import MainAdmin from "../components/MainAdmin";

const Admin = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      <Nav justify variant="tabs" activeKey={currentPath}>
        <Nav.Item>
          <Nav.Link as={Link} to="/admin" eventKey="/admin">
            Inicio
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/admin/peliculas" eventKey="/admin/peliculas">
            Películas
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/admin/productos" eventKey="/admin/productos">
            Productos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/admin/empleados" eventKey="/admin/empleados">
            Empleados
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<MainAdmin />} />
          <Route path="peliculas" element={<CrudPeliculas />} />
          <Route path="productos" element={<CrudProductos />} />
          <Route path="empleados" element={<CrudEmpleados />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
