import React from "react";
import { useCarritoStore } from "../store/cartStore.js";
import "../styles/carrito.css";

const Carrito = () => {
  const {
    productos,
    agregarAlCarrito,
    reducirCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    obtenerTotal,
  } = useCarritoStore();

  return (
    <div className="carrito-container">
      {productos.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {productos.map((producto) => (
            <div key={producto.id} className="producto-item">
              <div className="info-producto">
                <img src={producto.imagen} alt="" />
                <span>
                  <strong>{producto.titulo}</strong> - ${producto.precio} x{" "}
                  {producto.cantidad}
                </span>
              </div>
              <div className="botones-cantidad">
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid red",
                    color: "red",
                  }}
                  onClick={() => reducirCantidad(producto.id)}
                >
                  -
                </button>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid green",
                    color: "green",
                  }}
                  onClick={() => agregarAlCarrito(producto)}
                >
                  +
                </button>
                <button
                  style={{
                    backgroundColor: "transparent",
                    border: "2px solid red",
                    color: "red",
                  }}
                  onClick={() => eliminarDelCarrito(producto.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <h3>Total: ${obtenerTotal().toFixed(2)}</h3>
          <div className="botones-carrito">
            <button className="vaciar" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>
            <button className="pagar" onClick={vaciarCarrito}>
              Pagar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
