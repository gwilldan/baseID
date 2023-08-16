import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [theme, setTheme] = useState("light");

  const setMode = (mode) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    const body = document.body;
    const currentTheme = body.classList.contains("dark-theme")
      ? "dark"
      : "light";

    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.classList.remove(
      currentTheme === "dark" ? "dark-theme" : "light-theme"
    );
    body.classList.add(newTheme === "dark" ? "dark-theme" : "light-theme");
  };

  const themeToggler = () => {
    theme === "light" ? setMode("dark") : setMode("light");
    toggleTheme();
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") || theme;
    console.log(localTheme);
    console.log(theme);
    localTheme && setTheme(localTheme);
    document.body.classList.add(`${localTheme}-theme`);
  }, []);
  return { theme, themeToggler };
};
