import React, { useState } from "react";
import { useCarritoStore } from "../store/cartStore.js";
import Swal from "sweetalert2";
import "../styles/carrito.css";
import { useAuthStore } from "../store/AuthStore.js";
import { useNavigate } from "react-router-dom";
import { registrarPago } from "../data/db.js";

const Carrito = () => {
  const {
    productos,
    agregarAlCarrito,
    reducirCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    obtenerTotal,
  } = useCarritoStore();

  const [nombre, setNombre] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");

  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [loading, setLoading] = useState(false);

  if (productos.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "30px" }}>
        Tu carrito está vacío
      </p>
    );
  }

  function asignarButaca() {
    const numero = Math.floor(Math.random() * 120) + 1;
    return `B${numero}`;
  }

  const handleMostrarFormularioPago = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Debes iniciar sesión",
        text: "Para realizar el pago, por favor inicia sesión primero.",
        confirmButtonText: "Ir al login",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButtonText: "mi-confirmar",
          cancelButton: "mi-cancelar",
        },
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const rolesPermitidos = ["cliente", "empleado", "admin"];
    if (!rolesPermitidos.includes(user.rol)) {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "No tienes permisos para realizar el pago.",
        customClass: {
          popup: "mi-popup",
          title: "mi-titulo",
          confirmButton: "mi-confirmar",
          cancelButton: "mi-cancelar",
        },
      });
      return;
    }

    setMostrarFormulario(true);
  };

  const handlePago = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const [resSalas, resFunciones] = await Promise.all([
        fetch("http://localhost:8000/api/salas"),
        fetch("http://localhost:8000/api/funciones"),
      ]);

      if (!resSalas.ok || !resFunciones.ok) {
        throw new Error("Error al obtener datos del servidor");
      }

      const totalConTarifa = obtenerTotal() + 500;

      const pago = {
        idUsuario: user.idUsuario,
        total: totalConTarifa,
        tarjeta_nombre: nombre.trim(),
        tarjeta_numero: numeroTarjeta.replace(/\s+/g, ""),
        tarjeta_vencimiento: vencimiento.includes("/")
          ? vencimiento.trim()
          : vencimiento.slice(0, 2) + "/" + vencimiento.slice(2),
        tarjeta_cvv: cvv.trim(),
      };
      console.log("Datos de pago enviados:", pago);

      await registrarPago(pago);

      let detalleHTML = `<h3>Factura</h3><table style="width:100%;border-collapse: collapse;">`;
      detalleHTML += `
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Imagen</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Nombre</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Precio Unitario</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Subtotal</th>
        </tr>
      </thead><tbody>`;

      productos.forEach((prod) => {
        detalleHTML += `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">
            <img src="${prod.imagen}" alt="${prod.titulo}" width="50" />
          </td>
          <td style="border: 1px solid #ddd; padding: 8px;">${prod.titulo}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${
            prod.cantidad
          }</td>
          <td style="border: 1px solid #ddd; padding: 8px;">$${Number(
            prod.precio
          ).toFixed(2)}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">$${(
            prod.cantidad * prod.precio
          ).toFixed(2)}</td>
        </tr>`;
      });

      detalleHTML += "</tbody></table>";

      const tienePelicula = productos.some((prod) => prod.trailer);
      if (tienePelicula) {
        const butacaAsignada = asignarButaca();
        detalleHTML += `<p style="margin-top: 15px; font-weight: bold;">Butaca asignada: ${butacaAsignada}</p>`;
      }

      detalleHTML += `<p style="margin-top: 10px; font-weight: bold;">Total pagado: $${totalConTarifa.toFixed(
        2
      )}</p>`;

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

      vaciarCarrito();
      setMostrarFormulario(false);
      setNombre("");
      setNumeroTarjeta("");
      setVencimiento("");
      setCvv("");
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
        {productos.map((producto, index) => {
  const tipo = producto.tipo;
  const id =
    producto.idProducto ?? producto.idCombo ?? producto.id ?? index;

  return (
    <div key={`${tipo}-${id}`} className="producto-item">
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
          onClick={() => reducirCantidad(producto, tipo)}
        >
          -
        </button>
        <button
          style={{
            backgroundColor: "transparent",
            border: "2px solid green",
            color: "green",
          }}
          onClick={() => agregarAlCarrito(producto, tipo)}
        >
          +
        </button>
        <button
          style={{
            backgroundColor: "transparent",
            border: "2px solid red",
            color: "red",
          }}
          onClick={() => eliminarDelCarrito(producto, tipo)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
})}


        <h3>Total: ${obtenerTotal().toFixed(2)}</h3>
        <div className="botones-carrito">
          <button className="vaciar" onClick={vaciarCarrito}>
            Vaciar Carrito
          </button>
          <button className="pagar" onClick={handleMostrarFormularioPago}>
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
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />

              <label>NUMERO DE TARJETA</label>
              <input
                type="number"
                placeholder="1234 5678 9012 3457"
                maxLength={16}
                value={numeroTarjeta}
                onChange={(e) => setNumeroTarjeta(e.target.value.slice(0, 16))}
                required
              />

              <div className="row">
                <div className="col">
                  <label>VENCIMIENTO</label>
                  <input
                    type="text"
                    placeholder="Mes/Año"
                    maxLength={7}
                    value={vencimiento}
                    onChange={(e) => setVencimiento(e.target.value)}
                    required
                  />
                </div>

                <div className="col">
                  <label>CVV</label>
                  <input
                    type="number"
                    placeholder="•••"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
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
