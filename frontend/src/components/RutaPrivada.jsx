import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

const RutaPrivada = ({ children, rolesPermitidos }) => {
  const { user } = useAuthStore();
  const rol = user?.rol?.toLowerCase(); // en minúscula por si viene como "Admin"

  if (!rol) {
    return <Navigate to="/login" />;
  }

  if (!rolesPermitidos.includes(rol)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RutaPrivada;
