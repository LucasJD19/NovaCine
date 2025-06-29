import React, { useEffect, useState } from "react";
import ProductoCard from "../components/ProductoCard";
import { getProductos } from "../data/db";

const ProductosTienda = () => {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  useEffect(() => {
    getProductos()
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  // Paginación
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosActuales = productos.slice(indicePrimero, indiceUltimo);

  const handleAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const handleSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  return (
    <div>
      <div className="row">
        {productosActuales.map((prod) => (
          <ProductoCard
            key={prod.idProducto}
            id={prod.idProducto}
            titulo={prod.nombre}
            precio={prod.precio}
            imagen="../../public/images/Pochoclera.png" // Si usás imágenes estáticas mejor usá import o public sin ruta relativa
            tipo={prod.tipo}
          />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="d-flex justify-content-center my-4">
        <button
          onClick={handleAnterior}
          disabled={paginaActual === 1}
          className="btn btn-warning me-2"
        >
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
