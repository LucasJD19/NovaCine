import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BarraBusqueda = () => {
  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState("peliculas");
  const navigate = useNavigate();

  const handleBuscar = async (e) => {
    e.preventDefault();
    if (!busqueda.trim()) return;

    const url = `http://localhost:8000/api/${tipo}/buscar?nombre=${encodeURIComponent(
      busqueda
    )}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      // Si el backend responde con error, mostramos mensaje vacío
      const resultados = Array.isArray(data) ? data : [];

      navigate("/busqueda", { state: { resultados, tipo, busqueda } });
    } catch (error) {
      console.error("Error al buscar:", error);
      navigate("/busqueda", { state: { resultados: [], tipo, busqueda } });
    }
  };

  return (
    <form
      onSubmit={handleBuscar}
      className="d-flex align-items-center w-80 gap-2 bg-dark p-2 rounded"
    >
      <select
        className="form-select bg-dark text-white"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        style={{ maxWidth: "130px" }}
      >
        <option value="peliculas">Películas</option>
        <option value="productos">Productos</option>
      </select>

      <div className="input-group">
        <input
          type="text"
          placeholder="Buscar..."
          className="form-control bg-dark text-white border-secondary"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button type="submit" className="btn btn-warning">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
};

export default BarraBusqueda;
