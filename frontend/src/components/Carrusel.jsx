import React, { useEffect, useState } from 'react';
import { getPeliculas } from '../data/db';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Carrusel = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    getPeliculas().then((data) => {
      const filtradas = data.filter(
        (p) => p.imagen_panoramica && p.imagen_panoramica.trim() !== ''
      );
      console.log(data);
      setPeliculas(filtradas);
    });
  }, []);

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide mb-5"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      style={{
        maxWidth: "100%",
        width: "1300px",
        height: "70vh",
        margin: "0 auto",
        overflow: "hidden",
        borderRadius: "12px",
        backgroundColor: "black",
      }}
    >
      <ol className="carousel-indicators d-none">
        {peliculas.map((_, index) => (
          <li
            key={index}
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
          ></li>
        ))}
      </ol>

      <div className="carousel-inner h-100">
        {peliculas.map((pelicula, index) => (
         
          <div
            key={pelicula.id || index}
            className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <img
                src={pelicula.imagen_panoramica}
                alt={pelicula.titulo}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  display: "block",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default Carrusel;
