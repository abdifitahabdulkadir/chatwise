"use client";

import { useState } from "react";
import { FaMoon } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";
const themes = {
  night: "winter",
  light: "light",
};
export default function ThemeToggleButton() {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.night : themes.light;
    const htmlElement = document.querySelector("html");
    if (htmlElement) htmlElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <button
      onClick={toggleTheme}
      className="btn bg-primary text-white  rounded-lg absolute top-0 right-2 btn-sm"
    >
      {theme === themes.light ? <FaMoon /> : <IoIosSunny />}
    </button>
  );
}
