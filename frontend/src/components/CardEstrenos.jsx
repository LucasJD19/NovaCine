import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/cardestrenos.css";

const CardEstrenos = ({ id, titulo, imagen}) => {
  const navigate = useNavigate();

  const irAFunciones = () => {
    navigate(`/funciones/${id}`);
  };

  return (
    <div className="col-6 col-md-3 mb-4 d-flex justify-content-center">
      <div
        className="card p-3 text-center card-hover"
        style={{
          width: "100%",
          maxWidth: "300px",
          height: "100%",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px rgba(255, 255, 255, 0.97)",
          backgroundColor: "black",
          border: "1px solid white",
          color: "white",
        }}
      >
        <img
          src={imagen}
          alt={titulo}
          style={{
            width: "100%",
            height: "400px",
            maxHeight: "400px",
            objectFit: "fill",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        />

        <h5>{titulo}</h5>
        <button className="btn btn-warning btn-sm" onClick={irAFunciones}>
          <strong>Ver Funciones</strong>
        </button>
      </div>
    </div>
  );
};

export default CardEstrenos;
