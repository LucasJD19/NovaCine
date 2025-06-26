import { create } from "zustand";

const getUserFromSession = () => {
  const userJSON = sessionStorage.getItem("user");
  if (userJSON) {
    try {
      return JSON.parse(userJSON);
    } catch {
      return null;
    }
  }
  return null;
};

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

