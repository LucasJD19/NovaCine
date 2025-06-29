import { create } from "zustand";

export const useSucursalStore = create((set) => ({
  sucursalSeleccionada: "",
  setSucursalSeleccionada: (id) => set({ sucursalSeleccionada: id }),
}));