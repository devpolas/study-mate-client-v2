import { useEffect, useState } from "react";
import { AiFillMoon, AiOutlineMoon } from "react-icons/ai";

export default function ThemeSwitch() {
  const [theme, setTheme] = useState("");

  // saved theme Load on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("localTheme") || "dracula";
    setTheme(savedTheme);
  }, []);

  // onmount and change theme
  useEffect(() => {
    if (!theme) return;
    localStorage.setItem("localTheme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function handleTheme() {
    setTheme((prev) => (prev === "dracula" ? "winter" : "dracula"));
  }

  return (
    <button
      className='transition-all duration-200 ease-in-out'
      onClick={handleTheme}
      aria-label='Toggle theme'
    >
      {theme === "dracula" ? (
        <AiOutlineMoon className='md:text-4xl text-2xl' />
      ) : (
        <AiFillMoon className='md:text-4xl text-2xl' />
      )}
    </button>
  );
}
