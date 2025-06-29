import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Estrenos from "./pages/Estrenos";
import Funciones from "./pages/Funciones";
import Tienda from "./pages/Tienda";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Empleado from "./pages/Empleado";
import Busqueda from "./pages/Busqueda";
import Error from "./pages/Error";
import Admin from "./pages/Admin";
import RutaPrivada from "./components/RutaPrivada";

const App = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estrenos" element={<Estrenos />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/funciones/:idPelicula" element={<Funciones />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/empleado" element={<Empleado />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/busqueda" element={<Busqueda />} />
          <Route path="*" element={<Error />} />
        </Routes> */}

        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/estrenos" element={<Estrenos />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/busqueda" element={<Busqueda />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/funciones/:idPelicula" element={<Funciones />} />
          <Route path="*" element={<Error />} />

          {/* Ruta solo para admin */}
          <Route
            path="/admin/*"
            element={
              <RutaPrivada rolesPermitidos={["admin"]}>
                <Admin />
              </RutaPrivada>
            }
          />
          {/* Ruta solo para empleado */}
          <Route
            path="/empleado"
            element={
              <RutaPrivada rolesPermitidos={["empleado"]}>
                <Empleado />
              </RutaPrivada>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
