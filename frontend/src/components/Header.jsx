import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  // Variable temporal para la cantidad de items en el carrito
  const cartCount = 0;

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        {/* Logo + Nombre empresa */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/images/LogoIcon.png"
            alt="NovaCine Logo"
            className="logo-img me-2"
          />


          <span className="brand-name">NovaCine</span>
        </Link>

        {/* Botón hamburguesa responsive */}
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

        {/* Navegación links */}
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/estrenos" className="nav-link">Estrenos</Link>
            </li>

            <li className="nav-item">
              <Link to="/tienda" className="nav-link">Tienda</Link>
            </li>
          </ul>
        </div>

        {/* Botón carrito fijo a la derecha */}
        <Link to="/carrito" className="btn btn-warning btn-circle position-relative ms-3">
          <i className="bi bi-cart-fill fs-5"></i>
          {cartCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cartCount}
              <span className="visually-hidden">productos en carrito</span>
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Header;
