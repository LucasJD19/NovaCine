import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { useSucursalStore } from "../store/sucursalStore";
import { useCarritoStore } from "../store/cartStore";
import "../styles/Header.css";
import BarraBusqueda from "./BarraBusqueda";

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const productos = useCarritoStore((state) => state.productos);

  const [sucursales, setSucursales] = useState([]);
  const sucursalSeleccionada = useSucursalStore((state) => state.sucursalSeleccionada);
  const setSucursalSeleccionada = useSucursalStore((state) => state.setSucursalSeleccionada);

  useEffect(() => {
    fetch("http://localhost:8000/api/sucursales")
      .then((res) => res.json())
      .then((data) => setSucursales(data))
      .catch((error) => console.error("Error al cargar sucursales:", error));
  }, []);

  const handleSeleccion = (e) => {
    setSucursalSeleccionada(e.target.value);
  };

  const handleBusqueda = (termino, tipo) => {
    console.log(`Buscando "${termino}" en ${tipo}`);
  };

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const cantidadTotal = productos.reduce((acc, prod) => acc + prod.cantidad, 0);

  return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-3">
  <div className="container-fluid d-flex justify-content-between align-items-start flex-wrap gap-3">

    {/* Columna Izquierda: Logo + Selector */}
    <div className="d-flex flex-column align-items-start" style={{ minWidth: "220px" }}>
      <Link to="/" className="navbar-brand d-flex align-items-center mb-2">
        <img
          src="/images/LogoIcon.png"
          alt="NovaCine Logo"
          className="logo-img me-2"
        />
        <span className="brand-name">NovaCine</span>
      </Link>

      <select
        className="form-select bg-dark text-white"
        value={sucursalSeleccionada}
        onChange={handleSeleccion}
        style={{ maxWidth: "130px",textAlign: "start", marginLeft: "7px" }}
      >
        <option value="">Sucursal</option>
        {sucursales.map((sucursal) => (
          <option key={sucursal.idSucursal} value={sucursal.idSucursal}>
            {sucursal.nombre}
          </option>
        ))}
      </select>
    </div>

    {/* Columna Derecha: Todo lo demás arriba */}
    <div className="flex-grow-1 d-flex flex-column">
      {/* Primera fila: Buscador + Carrito + Usuario + Toggler */}
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <div className="flex-grow-1 me-3">
          <BarraBusqueda onSearch={handleBusqueda} />
        </div>

        {user && (
          <span className="text-white me-3 fw-bold d-flex align-items-center">
            Bienvenido {user.nombre}
          </span>
        )}

        <Link
          to="/carrito"
          className="btn btn-warning btn-circle position-relative me-2"
        >
          <i className="bi bi-cart-fill fs-5"></i>
          {cantidadTotal > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cantidadTotal}
              <span className="visually-hidden">productos en carrito</span>
            </span>
          )}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavCollapse}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Segunda fila: Links y botón LogIn */}
      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse mt-3`}
        id="navbarNav"
      >
        <ul className="navbar-nav d-flex align-items-center flex-wrap gap-3 ms-auto">
          {user?.rol === "admin" && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link">Admin</Link>
            </li>
          )}
          {user?.rol === "empleado" && (
            <li className="nav-item">
              <Link to="/empleado" className="nav-link">Empleado</Link>
            </li>
          )}
          <li className="nav-item">
            <Link to="/" className="nav-link">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="/estrenos" className="nav-link">Estrenos</Link>
          </li>
          <li className="nav-item">
            <Link to="/tienda" className="nav-link">Tienda</Link>
          </li>
          <li>
            <button
              onClick={handleAuthClick}
              style={{
                backgroundColor: "#f1c40f",
                border: "none",
                color: "#fff",
                padding: "10px 25px",
                minWidth: "100px",
                whiteSpace: "nowrap",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#d4ac0d")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#f1c40f")
              }
            >
              {user ? "Log Out" : "Log In"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

);

};

export default Header;
