import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSucursalStore } from "../store/sucursalStore";
import "../styles/Footer.css";

const Footer = () => {
  const [sucursales, setSucursales] = useState([]);
  const sucursalSeleccionada = useSucursalStore((state) => state.sucursalSeleccionada);

  useEffect(() => {
    fetch("http://localhost:8000/api/sucursales")
      .then((res) => res.json())
      .then((data) => setSucursales(data))
      .catch((error) => console.error("Error al cargar sucursales:", error));
  }, []);

  const sucursalNombre = sucursales.find(s => s.idSucursal == sucursalSeleccionada)?.nombre;

  return (
    <footer className="footer bg-dark text-light text-center py-4 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center px-4">
        {/* Logo */}
        <div className="footer-logo mb-3 mb-md-0">
          <Link to="/">
            <img
              src="/images/NovaCine-logo-square.png"
              alt="NovaCine Logo"
              className="footer-logo-img"
            />
          </Link>
        </div>

        {/* Nombre de la sucursal seleccionada */}
        <div className="text-white mb-3 mb-md-0">
          {sucursalSeleccionada ? (
            <span>
              Sucursal: <strong>{sucursalNombre}</strong>
            </span>
          ) : (
            ""
          )}
        </div>

        {/* Redes sociales */}
        <div className="footer-social">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon me-3"
          >
            <i className="bi bi-instagram"></i>
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon me-3"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://wa.me/XXXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
          >
            <i className="bi bi-whatsapp"></i>
          </a>
        </div>
      </div>

      <div className="text-center mt-3">
        <p className="footer-copy mb-0">
          © {new Date().getFullYear()} NovaCine. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
