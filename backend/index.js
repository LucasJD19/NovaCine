// import bibliotecas necesarias
const express = require("express");      
const mysql = require("mysql2");            
const cors = require("cors");               
const dotenv = require("dotenv");           // Para leer variables de entorno desde .env
const peliculasRoutes = require("./routes/peliculas.routes"); // Import de las rutas de peliculas
const usuariosRoutes = require("./routes/usuarios.routes"); // Import de rutas usuarios
const productosRoutes = require('./routes/productos.routes'); // Import de rutas productos 
const provinciasRoutes = require('./routes/provincias.routes');
const funcionesRoutes = require("./routes/funciones.routes");
const salasRoutes = require('./routes/salas.routes');
const sucursalesRoutes = require('./routes/sucursales.routes');
const loginRoutes = require("./routes/login.routes");
const combosRoutes = require("./routes/combos.routes");
const comboProductoRoutes = require("./routes/combo_producto.routes");
const pagosRoutes = require("./routes/pagos.routes");
const carritoRoutes = require('./routes/carrito.routes');
const carritoItemsRoutes = require('./routes/carritoItems.routes');

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
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/provincias", provinciasRoutes);
app.use("/api/funciones", funcionesRoutes);
app.use("/api/salas", salasRoutes);
app.use("/api/sucursales", sucursalesRoutes);
app.use("/api", loginRoutes);
app.use("/api/combos", combosRoutes);
app.use("/api/combo-producto", comboProductoRoutes);
app.use("/api/pagos", pagosRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/carrito-items', carritoItemsRoutes);

// Servidor escucha en el puerto definido en .env o 8000 por defecto
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
