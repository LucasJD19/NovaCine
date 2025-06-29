import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useCarritoStore } from "../store/cartStore";
import "../styles/Funciones.css";

const MainFunciones = () => {
  const { idPelicula } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [funciones, setFunciones] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const agregarAlCarrito = useCarritoStore((state) => state.agregarAlCarrito);

  const getFechaUTC = (fechaHora) => {
    const date = new Date(fechaHora);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  useEffect(() => {
    const fetchPeliculaYFunciones = async () => {
      try {
        const resPeli = await fetch("http://localhost:8000/api/peliculas");
        const dataPeli = await resPeli.json();
        const peli = dataPeli.find((p) => p.idPelicula === Number(idPelicula));
        setPelicula(peli);

        const resFunciones = await fetch(
          `http://localhost:8000/api/funciones/pelicula/${idPelicula}`
        );
        const dataFunciones = await resFunciones.json();
        setFunciones(dataFunciones);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };

    fetchPeliculaYFunciones();
  }, [idPelicula]);

  if (!pelicula) return <p>Cargando película...</p>;

  const fechasDisponibles = Array.from(
    new Set(funciones.map((f) => getFechaUTC(f.fechaHora)))
  ).sort((a, b) => new Date(a) - new Date(b));

  const funcionesFiltradas = fechaSeleccionada
    ? funciones
        .filter((f) => getFechaUTC(f.fechaHora) === fechaSeleccionada)
        .sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora))
    : [];

  const getEmbedUrl = (url) => {
    if (!url.includes("watch?v=")) return url;
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleSeleccionarFuncion = (f) => {
    const hora = new Date(f.fechaHora).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dia = new Date(f.fechaHora).toLocaleDateString("es-AR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    });

    Swal.fire({
      title: "Tu selección:",
      html: `
        <strong>${pelicula.titulo}</strong><br>
        ${dia.toUpperCase()} ${hora} Hs<br>
        ${f.formato} ${f.idioma.toUpperCase()}
      `,
      showCancelButton: true,
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "mi-confirmar",
        cancelButton: "mi-cancelar",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        agregarAlCarrito({
          id: pelicula.idPelicula,
          titulo: pelicula.titulo,
          precio: f.precio,
          imagen: pelicula.imagen,
          cantidad: 1,
          trailer: pelicula.trailer
        });

        Swal.fire({
          title: "Agregado al carrito",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
          customClass: {
            popup: "mi-popup",
            title: "mi-titulo",
            confirmButton: "mi-confirmar",
            cancelButton: "mi-cancelar",
          },
        });
      }
    });
  };

  return (
    <main className="funciones-container">
      <section className="top-section">
        <div className="poster-info">
          <img
            src={pelicula.imagen}
            alt={`Poster de ${pelicula.titulo}`}
            className="poster"
          />
          <div className="info">
            <h2>{pelicula.titulo}</h2>
            <p>Duración: {pelicula.duracion} Minutos</p>
            <p>Clasificación: {pelicula.clasificacion}</p>
            <p className="descripcion">{pelicula.descripcion}</p>
          </div>
        </div>

        <div className="right-section">
          <div className="trailer-container">
            {pelicula.trailer ? (
              <iframe
                src={getEmbedUrl(pelicula.trailer)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <p>No hay tráiler disponible</p>
            )}
          </div>

          <div className="aviso">
            <p>
              La venta online cierra 60 minutos antes de cada función. Puede
              adquirir entradas en boletería hasta el horario de inicio de la
              misma.
            </p>
          </div>

          {/* botones de fechas únicas */}
          <section className="fechas">
            {fechasDisponibles.map((fecha) => {
              const date = new Date(fecha + "T00:00:00");
              const dia = date
                .toLocaleDateString("es-AR", { weekday: "short" })
                .toUpperCase();
              const fechaFormateada = date.toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
              });

              return (
                <div
                  key={fecha}
                  onClick={() => setFechaSeleccionada(fecha)}
                  className={fechaSeleccionada === fecha ? "fecha-activa" : ""}
                  style={{ cursor: "pointer" }}
                >
                  {dia}
                  <br />
                  {fechaFormateada}
                </div>
              );
            })}
          </section>

          {/* Mostrar funciones del día */}
          <section className="funciones">
            <div className="funcion-card">
              <h3 className="funcion-titulo">
                {fechaSeleccionada ? (
                  <>
                    Funciones para el{" "}
                    {(() => {
                      const fecha = new Date(fechaSeleccionada + "T00:00:00");
                      const dia = fecha.toLocaleDateString("es-AR", {
                        weekday: "long",
                      });
                      return dia.charAt(0).toUpperCase() + dia.slice(1);
                    })()}
                  </>
                ) : (
                  "Seleccione un día"
                )}
              </h3>

              {funcionesFiltradas.length > 0 &&
                funcionesFiltradas.map((f) => {
                  const hora = new Date(f.fechaHora).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <div key={f.idFuncion} className="funcion-item">
                      <div>
                        <strong style={{ fontSize: "20px" }}>
                          {f.formato}
                        </strong>{" "}
                        {f.idioma.toUpperCase()}
                      </div>
                      <div
                        className="horarios"
                        onClick={() => handleSeleccionarFuncion(f)}
                      >
                        {hora}
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>

          <br />
          <br />
        </div>
      </section>
    </main>
  );
};

export default MainFunciones;
