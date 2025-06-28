import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Estrenos from "./pages/Estrenos";
import Funciones from "./pages/Funciones";
import Tienda from "./pages/Tienda";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import Admin from "./pages/Admin";
import Empleado from "./pages/Empleado";
import Error from "./pages/Error";
import Busqueda from "./pages/Busqueda";

const App = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estrenos" element={<Estrenos />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/funciones/:idPelicula" element={<Funciones />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/empleado" element={<Empleado />} />
          <Route path="*" element={<Error />} />
          <Route path="/busqueda" element={<Busqueda/>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
