import React from "react";

const Mainregister = () => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div
          className="bg-dark card shadow p-4 border-yellow"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <h3 className="text-center mb-4">Registrate</h3>
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
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-yellow mt-4">
                Registrarme
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Mainregister;
