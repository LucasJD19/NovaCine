import React from "react";
import Carrusel from "../components/Carrusel";
import CardPeliculas from "../components/CardPeliculas";

const Home = () => {
  return (
    <div className="container mt-4">
      <Carrusel />
      <CardPeliculas />
    </div>
  );
};

export default Home;
