import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../index.css";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Funciones");
  };

  return (
    <div className="container mt-4">
      {/* Carrusel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
        data-bs-interval="500"
        style={{
          maxWidth: "1300px",
          height: "500px",
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: "12px",
          backgroundColor: "black",
        }}
      >
       {/* necesario para que funcione el carrusel pero no se ve */}
        <ol className="carousel-indicators d-none">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
          ></li>
        </ol>
        {/* //////////// */}

        {/* aca van las imagenes del carrusel */}
        <div className="carousel-inner h-100">
          <div className="carousel-item active h-100">
            <div style={{ width: "100%", height: "100%" }}>
              <img
                src="https://sm.ign.com/ign_es/screenshot/default/ewgyaafucaixexq_axsk.jpg"
                alt="Banner 1"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  display: "block",
                }}
              />
            </div>
          </div>
          <div className="carousel-item h-100">
            <div style={{ width: "100%", height: "100%" }}>
              <img
                src="https://www.viapais.com.ar/resizer/v2/AQX4LG3SLBASXANIP5B7VQFLBQ.jpg?auth=5165d05ffab4402e79c6b6f47ce91b60a2e46daf539fafbacd360dbaf7b9f702&width=5091&height=2539"
                alt="Banner 1"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  display: "block",
                }}
              />
            </div>
          </div>
          <div className="carousel-item h-100">
            <div style={{ width: "100%", height: "100%" }}>
              <img
                src="https://lumiere-a.akamaihd.net/v1/images/image001_c28f1385.jpeg?region=0,156,1920,768"
                alt="Banner 1"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
        
        {/* las flechas para mover el carrusel */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Cards con imagen */}
      <div className="row">
        <div className="col-md-4 mb-4">
          <div
            className="card bg-dark border-white"
            style={{ cursor: "pointer", height: "100%" }}
            onClick={handleClick}
          >
            <img
              src="https://infocronos.com.ar/uploads/ckeditor/2024/04/20240403154014_joker-folie-a-deux-first-poster-shows-a-dancing-joaquin-phoe-8d9v.jpg"
              className="card-img-top"
              alt="Película"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div
            className="card bg-dark border-white"
            style={{ cursor: "pointer", height: "100%" }}
            onClick={handleClick}
          >
            <img
              src="https://i.redd.it/new-poster-for-thunderbolts-in-theaters-on-may-2-v0-br0qp4pcxete1.jpg?width=1290&format=pjpg&auto=webp&s=b57c2fb250b46a87fbb1c68ac92100bb24b01522"
              className="card-img-top"
              alt="Película"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div
            className="card bg-dark border-white"
            style={{ cursor: "pointer", height: "100%" }}
            onClick={handleClick}
          >
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiZ2DJXwZG4ZkCK_Ibckyx8nVze9MQzxwyL_qXtXVapUcv0sLz0ysXgNs1H9LrUzknUSf8GPaTovh9bfTzIknSBcTMvHwZKlB1v0Bsa843drieweSgTDyrhObInDzJHeNzI1dOZVIXPSFQ7ZnYRal1O6HLYOmhcVl0b5NaOWOa3Xl9tga3X9q6FDBN2Vj0/s16000-rw/capitan-america-un-nuevo-mundo.jpg"
              className="card-img-top"
              alt="Película"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
