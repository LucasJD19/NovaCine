import React, { useEffect, useState } from "react";
import { getPeliculas } from "../data/db";
import { useNavigate } from "react-router-dom";
import { useSucursalStore } from "../store/sucursalStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/cardpeliculas.css";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const CardPeliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const navigate = useNavigate();
  const sucursalSeleccionada = useSucursalStore((state) => state.sucursalSeleccionada);

  useEffect(() => {
    getPeliculas().then((data) => {
      if (sucursalSeleccionada) {
        // Mostrar del 6 al 12 si hay sucursal seleccionada
        setPeliculas(data.slice(6, 12));
      } else {
        // Mostrar 6 películas al azar si NO hay sucursal
        setPeliculas(shuffleArray(data).slice(0, 6));
      }
    });
  }, [sucursalSeleccionada]);

  const handleClick = (idPelicula) => {
    navigate(`/funciones/${idPelicula}`);
  };

  return (
    <div className="row">
      {peliculas.map((pelicula) => (
        <div key={pelicula.idPelicula} className="col-12 col-sm-6 col-md-4 mb-4">
          <div
            className="card bg-dark h-100 card-edit"
            style={{
              cursor: "pointer",
              width: "90%",
              height: "100%",
              marginBottom: "20px"
            }}
            onClick={() => handleClick(pelicula.idPelicula)}
          >
            <img
              src={pelicula.imagen}
              className="card-img-top h-100"
              alt={pelicula.titulo}             
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardPeliculas;
