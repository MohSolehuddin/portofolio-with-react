"use client";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(theme === "dark");
  }, [theme]);

  return (
    <section className="bg-light/20 dark:bg-dark/20 p-3 rounded-full">
      {isDarkMode ? (
        <Moon onClick={() => setTheme("light")} />
      ) : (
        <Sun onClick={() => setTheme("dark")} />
      )}
    </section>
  );
}
