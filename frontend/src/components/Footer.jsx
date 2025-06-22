import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light text-center py-4 mt-auto">
            <div className="container">
                {/* Logo */}
                <div className="footer-logo mb-4 d-flex justify-content-center">
  <Link to="/">
    <img src="/images/NovaCine-logo-square.png" alt="NovaCine Logo" className="footer-logo-img" />
  </Link>
</div>


                {/* Redes sociales */}
                <div className="footer-social mb-3">
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-icon"
                    >
                        <i className="bi bi-instagram"></i>
                    </a>
                    <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-icon"
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

                {/* Derechos reservados */}
                <p className="footer-copy mb-0">© {new Date().getFullYear()} NovaCine. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
