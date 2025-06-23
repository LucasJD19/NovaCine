import { create } from 'zustand';

export const useCarritoStore = create((set, get) => ({
  productos: [],

  agregarAlCarrito: (producto) => {
    const productosActuales = get().productos;
    const existente = productosActuales.find((item) => item.id === producto.id);

    if (existente) {
      // Si ya está en el carrito, aumentamos la cantidad
      const actualizados = productosActuales.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      set({ productos: actualizados });
    } else {
      // Si no está, lo agregamos con cantidad 1
      set({ productos: [...productosActuales, { ...producto, cantidad: 1 }] });
    }
  },
  reducirCantidad: (idProducto) => {
    const productosActuales = get().productos;
    const actualizados = productosActuales
      .map((item) =>
        item.id === idProducto
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
      .filter((item) => item.cantidad > 0);

    set({ productos: actualizados });
  },

  eliminarDelCarrito: (idProducto) => {
    const filtrados = get().productos.filter((item) => item.id !== idProducto);
    set({ productos: filtrados });
  },
  

  vaciarCarrito: () => set({ productos: [] }),

  obtenerTotal: () =>
    get().productos.reduce((total, item) => total + item.precio * item.cantidad, 0),
}));
