import { create } from "zustand";

export const themeStore = create((set) => ({
  theme: localStorage.getItem("NewsHub-theme") || "dark",
  setTheme: (theme) => {
    localStorage.setItem("NewsHub-theme", theme);
    set({ theme });
  },
}));
