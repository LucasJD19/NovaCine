import React, { useEffect, useState } from 'react';
import { getPeliculas } from '../data/db';
import ProductoCard from './ProductoCard';

const MainEstrenos = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    getPeliculas()
      .then(data => setPeliculas(data))
      .catch(err => console.error("Error al cargar películas:", err));
  }, []);

  return (
    <main className="main-peliculaa">
      <div className="row">
        {peliculas.map((peli) => (
          <ProductoCard
            key={peli.idPelicula}
            id={peli.idPelicula}
            titulo={peli.titulo}
            precio={peli.precio || 0}
            imagen={peli.imagen}
            tipo={peli.tipo || "boleto"}
          />
        ))}
      </div>
    </main>
  );
};

export default MainEstrenos;
