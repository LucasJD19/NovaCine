import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import Swal from "sweetalert2";
import { useAuthStore } from "../store/AuthStore";
import axios from "axios";

const MainLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );

      if (!data.user) {
        Swal.fire({
          title: "Error",
          text: "Credenciales inválidas",
          icon: "error",
          background: "#000",
          color: "#fff",
          confirmButtonColor: "#e74c3c",
        });
        return;
      }

      login(data.user);

      Swal.fire({
        title: `¡Bienvenido!`,
        text: `Hola ${data.user.nombre}`,
        icon: "success",
        background: "#000",
        color: "#fff",
        confirmButtonColor: "#f1c40f",
      });

      // Redirige según el rol del usuario
      switch (data.user.rol) {
        case "admin":
          navigate("/admin");
          break;
        case "empleado":
          navigate("/empleado");
          break;
        case "cliente":
          navigate("/home");
          break;
        default:
          Swal.fire("Error", "Rol desconocido", "error");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        title: "Error",
        text: "Credenciales incorrectas o error del servidor",
        icon: "error",
        background: "#000",
        color: "#fff",
        confirmButtonColor: "#e74c3c",
      });
    }
  };

  const handleRegisterClick = () => {
    navigate("/Register");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div
        className="bg-dark card shadow p-4 border-yellow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4 text-light">Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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
            <label htmlFor="password" className="form-label text-light">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="Ingresá tu contrasena"
              required
            />
          </div>
          <div className="d-grid gap-2 mt-5">
            <button type="submit" className="btn btn-yellow">
              Ingresar
            </button>
            <button
              type="button"
              className="btn btn-green"
              onClick={handleRegisterClick}
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainLogin;
