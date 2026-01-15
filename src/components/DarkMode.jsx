import { useEffect, useState } from "react";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";

function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  function toggleDaekMode() {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <button
      onClick={toggleDaekMode}
      className="p-2.5 rounded-full bg-gray-400 
        dark:bg-gray-700 dark:text-white 
        flex items-center justify-center"
    >
      {isDarkMode ? <BsSunFill /> : <BsFillMoonStarsFill />}
    </button>
  );
}

export default DarkMode;
