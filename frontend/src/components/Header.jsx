import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import "../styles/Header.css";
import BarraBusqueda from "./BarraBusqueda";
import { useCarritoStore } from "../store/cartStore";

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  // Función para manejar la búsqueda
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
  const productos = useCarritoStore((state) => state.productos);

  // Total de cantidad (por si hay repetidos con cantidad > 1)
  const cantidadTotal = productos.reduce((acc, prod) => acc + prod.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/images/LogoIcon.png"
            alt="NovaCine Logo"
            className="logo-img me-2"
          />
          <span className="brand-name">NovaCine</span>
        </Link>
        {/* Barra de búsqueda */}
        <BarraBusqueda onSearch={handleBusqueda} />
        {/* Botón hamburguesa + Carrito */}
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler me-2"
            type="button"
            onClick={handleNavCollapse}
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {user && (
            <span className="text-white me-3 fw-bold">
              {" "}
              Bienvenido {user.nombre}
            </span>
          )}

          <Link
            to="/carrito"
            className="btn btn-warning btn-circle position-relative"
          >
            <i className="bi bi-cart-fill fs-5"></i>
            {cantidadTotal > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cantidadTotal}
                <span className="visually-hidden">productos en carrito</span>
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Menú de navegación */}
      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarNav"
      >
        <ul className="navbar-nav mx-auto align-items-center">
          {/* lo dejo comentado por si hay que activarlo para terminar lo que falta */}
          {/* <li className="nav-item">
            <Link to="/admin" className="nav-link">
              Admin
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link to="/empleado" className="nav-link">
              Empleado
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/estrenos" className="nav-link">
              Estrenos
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tienda" className="nav-link">
              Tienda
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li> */}
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
    </nav>
  );
};

export default Header;
