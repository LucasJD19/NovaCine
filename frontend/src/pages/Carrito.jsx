import React, { useState } from "react";
import { useCarritoStore } from "../store/cartStore.js";
import Swal from "sweetalert2";
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
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loading, setLoading] = useState(false);

  if (productos.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "30px" }}>
        Tu carrito está vacío
      </p>
    );
  }

  // Función para asignar butacas al azar según capacidad de la sala y cantidad
  function asignarButacas(capacidad, cantidad) {
    const butacas = new Set();
    while (butacas.size < cantidad) {
      const asiento = Math.floor(Math.random() * capacidad) + 1;
      butacas.add(asiento);
    }
    return Array.from(butacas);
  }

  // Maneja el pago, pide datos y muestra
  const handlePago = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Traer salas y funciones
      const [resSalas, resFunciones] = await Promise.all([
        fetch("http://localhost:8000/api/salas"),
        fetch("http://localhost:8000/api/funciones"),
      ]);

      if (!resSalas.ok || !resFunciones.ok) {
        throw new Error("Error al obtener datos del servidor");
      }

      const salas = await resSalas.json();
      const funciones = await resFunciones.json();

      // Armar detalle HTML
      let detalleHTML = `<h3>Factura</h3><table style="width:100%;border-collapse: collapse;">`;
      detalleHTML += `
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Imagen</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Nombre</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Precio Unitario</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Subtotal</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Butacas</th>
          </tr>
        </thead><tbody>`;

      productos.forEach((prod) => {
       console.log(productos);
        if (prod.idSala && prod.idFuncion) {
          // Buscamos función para sacar sala y capacidad
          const funcion = funciones.find((f) => f.idFuncion === prod.idFuncion);
          if (funcion) {
            const sala = salas.find((s) => s.idSala === funcion.idSala);
            if (sala) {
              const butacas = asignarButacas(sala.capacidad, prod.cantidad);
              detalleHTML += `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">
                    <img src="${prod.imagen}" alt="${prod.titulo}" width="50" />
                  </td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${
                    prod.titulo
                  }</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${
                    prod.cantidad
                  }</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">$${Number(
                    prod.precio
                  ).toFixed(2)}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">$${(
                    prod.cantidad * prod.precio+500
                  ).toFixed(2)}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${butacas.join(
                    ", "
                  )}</td>
                </tr>`;
            }
          }
        } else {
          // Producto normal sin butacas
          detalleHTML += `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">
                <img src="${prod.imagen}" alt="${prod.titulo}" width="50" />
              </td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                prod.titulo
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${
                prod.cantidad
              }</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$${Number(
                prod.precio
              ).toFixed(2)}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$${(
                prod.cantidad * prod.precio+500
              ).toFixed(2)}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">-</td>
            </tr>`;
        }
      });

      detalleHTML += "</tbody></table>";

      await Swal.fire({
        html: detalleHTML,
        icon: "success",
        width: "750px",
        confirmButtonText: "Cerrar",
        customClass: {
        popup: "mi-popup",
        title: "mi-titulo",
        confirmButton: "mi-confirmar",
        cancelButton: "mi-cancelar",
      },
      });

      setMostrarFormulario(false);
      vaciarCarrito();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`carrito-y-formulario ${
        mostrarFormulario ? "con-formulario" : "centrado"
      }`}
    >
      <div
        className={`carrito-container ${
          mostrarFormulario ? "mover-carrito" : ""
        }`}
      >
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
          <button className="pagar" onClick={() => setMostrarFormulario(true)}>
            Pagar
          </button>
        </div>
      </div>

      {mostrarFormulario && (
        <div className="tarjeta-estilo formulario-pago">
          <div className="card-details">
            <div className="header">
              <h5>DETALLE DE PAGO</h5>
            </div>

            <p className="label">METODO DE PAGO</p>
            <div className="card-icons">
              <i className="fab fa-cc-mastercard"></i>
              <i className="fab fa-cc-visa"></i>
            </div>

            <form onSubmit={handlePago}>
              <label>NOMBRE Y APELLIDO</label>
              <input
                type="text"
                placeholder="Como figura en la tarjeta"
                required
              />

              <label>NUMERO DE TARJETA</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3457"
                maxLength={19}
                required
              />

              <div className="row">
                <div className="col">
                  <label>VENCIMIENTO</label>
                  <input
                    type="text"
                    placeholder="Mes/Año"
                    maxLength={7}
                    required
                  />
                </div>

                <div className="col">
                  <label>CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              <hr />

              <div className="summary-row">
                <span>SUBTOTAL</span>
                <span>${obtenerTotal().toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>TARIFA</span>
                <span>$500</span>
              </div>

              <div className="summary-row total">
                <strong>TOTAL</strong>
                <strong>${(obtenerTotal() + 500).toFixed(2)}</strong>
              </div>

              <button className="checkout-btn" type="submit" disabled={loading}>
                <div className="btn-content">
                  <span>${(obtenerTotal() + 500).toFixed(2)}</span>
                  <span>
                    {loading ? "Procesando..." : "PAGAR"}{" "}
                    <i className="fas fa-long-arrow-alt-right"></i>
                  </span>
                </div>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
