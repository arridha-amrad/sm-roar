import { useEffect } from "react";

const useTheme = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (!theme) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.setAttribute("theme-mode", "dark");
      } else {
        document.documentElement.setAttribute("theme-mode", "light");
      }
      return;
    }
    document.documentElement.setAttribute(
      "theme-mode",
      theme === "dark" ? "dark" : "light"
    );
  }, []);
};

export default useTheme;
