import React from "react";
import { useCarritoStore } from "../store/cartStore.js";
import "../styles/carrito.css";
import { useState } from "react";

const Carrito = () => {
  const {
    productos,
    agregarAlCarrito,
    reducirCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    obtenerTotal,
  } = useCarritoStore();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  if (productos.length === 0) {
    // Si no hay productos, no mostrar nada (ni carrito ni formulario)
    return <p style={{ textAlign: "center", marginTop: "30px" }}>Tu carrito está vacío</p>;
  }

  return (
    <div className={`carrito-y-formulario ${mostrarFormulario ? 'con-formulario' : 'centrado'}`}>
      <div className={`carrito-container ${mostrarFormulario ? "mover-carrito" : ""}`}>
        {productos.map((producto) => (
          <div key={producto.id} className="producto-item">
            <div className="info-producto">
              <img src={producto.imagen} alt="" />
              <span>
                <strong>{producto.titulo}</strong> - ${producto.precio} x {producto.cantidad}
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
          <button className="pagar" onClick={() => setMostrarFormulario(true)}>
            Pagar
          </button>
        </div>
      </div>

      {mostrarFormulario && (
        <div className="formulario-pago">
          <div className="card-details">
            <div className="header">
              <h5>DETALLE DE PAGO</h5>
            </div>

            <p className="label">METODO DE PAGO</p>
            <div className="card-icons">
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-visa"></i>
            </div>

            <form>
              <label>NOMBRE Y APELLIDO</label>
              <input type="text" placeholder="Como figura en la tarjeta" />

              <label>NUMERO DE TARJETA</label>
              <input type="text" placeholder="1234 5678 9012 3457" maxLength={19} />

              <div className="row">
                <div className="col">
                  <label>VENCIMIENTO</label>
                  <input type="text" placeholder="Mes/Año" maxLength={7} />
                </div>

                <div className="col">
                  <label>CVV</label>
                  <input type="password" placeholder="•••" maxLength={3} />
                </div>
              </div>
            </form>

            <hr />

            <div className="summary-row">
              <span>SUBTOTAL</span>
              <span>${obtenerTotal().toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>TARIFA</span>
              <span>$20.00</span>
            </div>

            <div className="summary-row total">
              <strong>TOTAL</strong>
              <strong>${(obtenerTotal() + 20).toFixed(2)}</strong>
            </div>

            <button className="checkout-btn">
              <div className="btn-content">
                <span>${(obtenerTotal() + 20).toFixed(2)}</span>
                <span>
                  PAGAR <i className="fas fa-long-arrow-alt-right"></i>
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
