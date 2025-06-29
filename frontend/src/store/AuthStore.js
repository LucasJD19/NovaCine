import { create } from "zustand";


function getUserFromSession() {
  const user = sessionStorage.getItem("user");
  console.log("Usuario en sessionStorage:", user);
  return user ? JSON.parse(user) : null;
}

export const useAuthStore = create((set) => ({
  user: getUserFromSession(),

  login: (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },

  logout: () => {
    sessionStorage.removeItem("user");
    set({ user: null });
  },
}));
