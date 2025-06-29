import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "../styles/login.css";

const MainRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    rol: "cliente",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/usuarios", formData);

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Ya podés iniciar sesión con tu cuenta",
        background: "#000",
        color: "#fff",
        confirmButtonColor: "#f1c40f",
      });

      navigate("/login");
    } catch (error) {
      console.error("Error al registrar:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el usuario",
        background: "#000",
        color: "#fff",
        confirmButtonColor: "#f1c40f",
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="bg-dark card shadow p-4 border-yellow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4 text-light">Registrate</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label text-light">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresá tu nombre"
              required
            />
            <label htmlFor="apellido" className="form-label text-light">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ingresá tu apellido"
              required
            />
            <label htmlFor="email" className="form-label text-light">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresá tu email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label text-light">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="Ingresá tu contraseña"
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-yellow mt-4">
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainRegister;
