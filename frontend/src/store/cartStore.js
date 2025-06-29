import { create } from 'zustand';

export const useCarritoStore = create((set, get) => ({
  productos: [],

  agregarAlCarrito: (producto) => {
    const productosActuales = get().productos;

    const existente = productosActuales.find((item) => {
      if (producto.idProducto) {
        return item.idProducto === producto.idProducto;
      } else if (producto.idCombo) {
        return item.idCombo === producto.idCombo;
      }
      return false;
    });

    if (existente) {
      const actualizados = productosActuales.map((item) => {
        if (
          (producto.idProducto && item.idProducto === producto.idProducto) ||
          (producto.idCombo && item.idCombo === producto.idCombo)
        ) {
          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      });
      set({ productos: actualizados });
    } else {
      set({ productos: [...productosActuales, { ...producto, cantidad: 1 }] });
    }
  },

  reducirCantidad: (idObj) => {
    const productosActuales = get().productos;
    const actualizados = productosActuales
      .map((item) => {
        if (
          (idObj.idProducto && item.idProducto === idObj.idProducto) ||
          (idObj.idCombo && item.idCombo === idObj.idCombo)
        ) {
          return { ...item, cantidad: item.cantidad - 1 };
        }
        return item;
      })
      .filter((item) => item.cantidad > 0);

    set({ productos: actualizados });
  },

  eliminarDelCarrito: (idObj) => {
    const filtrados = get().productos.filter((item) => {
      if (idObj.idProducto) {
        return item.idProducto !== idObj.idProducto;
      } else if (idObj.idCombo) {
        return item.idCombo !== idObj.idCombo;
      }
      return true;
    });
    set({ productos: filtrados });
  },

  vaciarCarrito: () => set({ productos: [] }),

  obtenerTotal: () =>
    get().productos.reduce((total, item) => total + item.precio * item.cantidad, 0),
}));
