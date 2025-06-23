import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light text-center py-4 mt-auto">
      <div className="container d-flex justify-content-between align-items-center px-4">
        {/* Logo */}
        <div className="footer-logo">
          <Link to="/">
            <img
              src="/images/NovaCine-logo-square.png"
              alt="NovaCine Logo"
              className="footer-logo-img"
            />
          </Link>
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
      {/* Derechos reservados */}
      <div className="text-center mt-3">
        <p className="footer-copy mb-0">
          © {new Date().getFullYear()} NovaCine. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
