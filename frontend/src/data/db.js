import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getPeliculas = () => API.get('/peliculas').then(res => res.data);
export const getProductos = () => API.get('/productos').then(res => res.data);
export const getFuncionesPorPelicula = (idPelicula) => API.get(`/funciones/pelicula/${idPelicula}`).then(res => res.data);
export const getCombos = () => API.get('/combos').then(res => res.data);