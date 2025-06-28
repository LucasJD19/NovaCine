import React, { useEffect, useState } from "react";
import { getPeliculas } from "../data/db";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/cardpeliculas.css";

const CardPeliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPeliculas().then((data) => {
      setPeliculas(data.slice(0, 6));
    });
  }, []);

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
