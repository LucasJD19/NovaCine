import React, { useState, useEffect } from "react";
import { getPeliculas } from "../data/db";
import CardEstrenos from "./CardEstrenos";

const MainEstrenos = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const peliculasPorPagina = 8;

  useEffect(() => {
    getPeliculas().then((data) => {
      setPeliculas(data);
    });
  }, []);

  // Calculamos el índice de las películas a mostrar según la página actual
  const indiceUltimaPelicula = paginaActual * peliculasPorPagina;
  const indicePrimeraPelicula = indiceUltimaPelicula - peliculasPorPagina;
  const peliculasActuales = peliculas.slice(
    indicePrimeraPelicula,
    indiceUltimaPelicula
  );

  // Cantidad total de páginas
  const totalPaginas = Math.ceil(peliculas.length / peliculasPorPagina);

  const handlePaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  return (
    <main className="main-peliculaa">
      <div className="row">
        {peliculasActuales.map((peli) => (
          <CardEstrenos
            key={peli.idPelicula}
            id={peli.idPelicula}
            titulo={peli.titulo}
            precio={peli.precio}
            imagen={peli.imagen}
            tipo="boleto"
          />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="d-flex justify-content-center my-4">
        <button
          onClick={handlePaginaAnterior}
          disabled={paginaActual === 1}
          className="btn btn-warning me-2"
        >
        <strong>Anterior</strong>  
        </button>

        <span className="align-self-center">
          Página {paginaActual} de {totalPaginas}
        </span>

        <button
          onClick={handlePaginaSiguiente}
          disabled={paginaActual === totalPaginas}
          className="btn btn-warning ms-2"
        >
        <strong>Siguiente</strong>  
        </button>
      </div>
    </main>
  );
};

export default MainEstrenos;
