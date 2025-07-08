import React from "react";
import useTheme from "../mycontext/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className={`p-4 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <h2>Current Theme: {theme}</h2>
      <button onClick={toggleTheme} className="mt-2 px-4 py-1 border rounded">
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeSwitcher;
