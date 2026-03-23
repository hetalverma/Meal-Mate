"use client";

import { useEffect } from "react";

export function ThemeInitializer() {
  useEffect(() => {
    const applyTheme = () => {
      const theme = localStorage.getItem("mealmate_theme");
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // Apply initially
    applyTheme();

    // Listen for storage changes (for switching across tabs/windows)
    window.addEventListener("storage", applyTheme);
    
    // Custom event for same-tab updates
    window.addEventListener("mealmate_theme_change", applyTheme);

    return () => {
      window.removeEventListener("storage", applyTheme);
      window.removeEventListener("mealmate_theme_change", applyTheme);
    };
  }, []);

  return null;
}