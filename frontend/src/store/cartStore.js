import { create } from "zustand";

export const useCarritoStore = create((set, get) => ({
  productos: [],

  agregarAlCarrito: (producto, tipo) => {
    const productosActuales = get().productos;
    const productoConTipo = { ...producto, tipo };

    const existente = productosActuales.find((item) => {
      if (tipo === "producto") return item.tipo === tipo && item.idProducto === producto.idProducto;
      if (tipo === "combo") return item.tipo === tipo && item.idCombo === producto.idCombo;
      if (tipo === "pelicula") return item.tipo === tipo && item.id === producto.id;
      return false;
    });

    if (existente) {
      const actualizados = productosActuales.map((item) => {
        if (
          (tipo === "producto" && item.tipo === tipo && item.idProducto === producto.idProducto) ||
          (tipo === "combo" && item.tipo === tipo && item.idCombo === producto.idCombo) ||
          (tipo === "pelicula" && item.tipo === tipo && item.id === producto.id)
        ) {
          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      });
      set({ productos: actualizados });
    } else {
      set({ productos: [...productosActuales, { ...productoConTipo, cantidad: 1 }] });
    }
  },

  reducirCantidad: (producto, tipo) => {
    const productosActuales = get().productos;
    const actualizados = productosActuales
      .map((item) => {
        if (
          (tipo === "producto" && item.tipo === tipo && item.idProducto === producto.idProducto) ||
          (tipo === "combo" && item.tipo === tipo && item.idCombo === producto.idCombo) ||
          (tipo === "pelicula" && item.tipo === tipo && item.id === producto.id)
        ) {
          return { ...item, cantidad: item.cantidad - 1 };
        }
        return item;
      })
      .filter((item) => item.cantidad > 0);

    set({ productos: actualizados });
  },

  eliminarDelCarrito: (producto, tipo) => {
    const productosActuales = get().productos;
    const actualizados = productosActuales.filter((item) => {
      if (tipo === "producto") return !(item.tipo === tipo && item.idProducto === producto.idProducto);
      if (tipo === "combo") return !(item.tipo === tipo && item.idCombo === producto.idCombo);
      if (tipo === "pelicula") return !(item.tipo === tipo && item.id === producto.id);
      return true;
    });
    set({ productos: actualizados });
  },

  vaciarCarrito: () => set({ productos: [] }),

  obtenerTotal: () =>
    get().productos.reduce((total, item) => total + item.precio * item.cantidad, 0),
}));
