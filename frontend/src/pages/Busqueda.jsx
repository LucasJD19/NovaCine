import React from "react";
import { useLocation } from "react-router-dom";
import ProductoCard from "../components/ProductoCard";
import CardEstrenos from "../components/CardEstrenos";

const Busqueda = () => {
  const location = useLocation();
  const { resultados, tipo, busqueda } = location.state || {};

  if (!resultados) {
    return (
      <div className="container mt-4">
        <h2>Sin resultados</h2>
        <p>No se pudo obtener datos de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>
        Resultados de "{busqueda}" en {tipo}
      </h2>

      {resultados.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <div className="row">
          {resultados.map((item) => {
            if (tipo === "productos") {
            
              return (
                <ProductoCard
                  key={item.idProducto}
                  id={item.idProducto}
                  titulo={item.nombre}
                  precio={item.precio}
                  imagen={item.imagen}
                  tipo={tipo}
                />
              );
            } else if (tipo === "peliculas") {
              // Para peliculas
              return (
                <CardEstrenos
                  key={item.idPelicula}
                  id={item.idPelicula}
                  titulo={item.titulo}
                  imagen={item.imagen} 
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Busqueda;
