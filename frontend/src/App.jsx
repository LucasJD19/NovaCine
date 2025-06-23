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
          <Route path="/funciones" element={<Funciones />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
