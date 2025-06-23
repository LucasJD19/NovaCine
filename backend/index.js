// import bibliotecas necesarias
const express = require("express");         
const mysql = require("mysql2");            
const cors = require("cors");               
const dotenv = require("dotenv");           // Para leer variables de entorno desde .env
const peliculasRoutes = require("./routes/peliculas.routes"); // Import de las rutas de peliculas

// Configuracion de Express y otras herramientas
const app = express();
dotenv.config(); // Carga de variables del archivo .env
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de NovaCine"); // Verificacion de conexion
});

// Rutas de la API
app.use("/api/peliculas", peliculasRoutes);  // Delegamos las rutas de /api/peliculas al archivo correspondiente

// Servidor escucha en el puerto definido en .env o 8000 por defecto
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
