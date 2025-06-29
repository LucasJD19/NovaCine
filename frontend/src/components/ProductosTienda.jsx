import React, { useEffect, useState } from "react";
import ProductoCard from "../components/ProductoCard";
import { getProductos, getCombos } from "../data/db";

const ProductosTienda = () => {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtro, setFiltro] = useState("todos");
  const productosPorPagina = 8;

  useEffect(() => {
    if (filtro === "todos") {
      getProductos()
        .then((data) => setProductos(data))
        .catch((err) => console.error(err));
    } else if (filtro === "combos") {
      getCombos()
        .then((data) => setProductos(data))
        .catch((err) => console.error(err));
    }
  }, [filtro]);

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosActuales = productos.slice(indicePrimero, indiceUltimo);

  const handleAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const handleSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  return (
    <div>
      <div className="d-flex justify-content-center mb-3">
        <button
          onClick={() => setFiltro("todos")}
          className={`btn me-2 ${filtro === "todos" ? "btn-warning" : "btn-outline-warning"}`}
        >
          Mostrar Todos
        </button>
        <button
          onClick={() => setFiltro("combos")}
          className={`btn ${filtro === "combos" ? "btn-warning" : "btn-outline-warning"}`}
        >
          Mostrar Combos
        </button>
      </div>

      <div className="row">
        {productosActuales.map((prod) => (
          <ProductoCard
            key={prod.idProducto || prod.idCombo}
            id={prod.idProducto || prod.idCombo}
            titulo={prod.nombre || prod.nombreCombo}
            precio={prod.precio || prod.precioCombo}
            imagen={prod.imagen || "../../public/images/Combo.png"}
            tipo={prod.tipo || "combo"}
          />
        ))}
      </div>

      <div className="d-flex justify-content-center my-4">
        <button onClick={handleAnterior} disabled={paginaActual === 1} className="btn btn-warning me-2">
          <strong>Anterior</strong>
        </button>
        <span className="align-self-center">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={handleSiguiente}
          disabled={paginaActual === totalPaginas}
          className="btn btn-warning ms-2"
        >
          <strong>Siguiente</strong>
        </button>
      </div>
    </div>
  );
};

export default ProductosTienda;
