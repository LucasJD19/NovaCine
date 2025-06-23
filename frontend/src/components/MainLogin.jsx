import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const MainLogin = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Register");
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div
          className="bg-dark card shadow p-4 border-yellow"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h3 className="text-center mb-4">Iniciar Sesión</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="usuario" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="usuario"
                placeholder="Ingresá tu email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Ingresá tu contraseña"
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
                onClick={handleClick}
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainLogin;
