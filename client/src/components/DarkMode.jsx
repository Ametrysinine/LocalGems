import React, { useState, useEffect } from "react";
import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";
import darkModeIcon from "../assets/dark_moon.svg";
import lightModeIcon from "../assets/dark_sun.svg";
import "react-toggle/style.css";
import "../styles/DarkModeToggle.scss";

export const DarkModeToggle = () => {
  // Initialize state with system preference or localStorage value
  const systemPrefersDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
  const [isDark, setIsDark] = useState(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode !== null ? JSON.parse(savedMode) : systemPrefersDark;
  });

  useEffect(() => {
    // Add or remove 'dark' class based on isDark state
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // Save the user's preference to localStorage
    localStorage.setItem("isDarkMode", isDark);
  }, [isDark]);

  return (
    <article className="dark-mode-toggle">
      <Toggle
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
        icons={{
          checked: (
            <span role="img" aria-label="Dark mode">
              <img className="toggle-sun" src={lightModeIcon} alt="Light mode icon" />
            </span>
          ),
          unchecked: (
            <span role="img" aria-label="Light mode">
              <img className="toggle-moon" src={darkModeIcon} alt="Dark mode icon" />
            </span>
          ),
        }}
        aria-label="Dark mode toggle"
      />
    </article>
  );
};
