"use client"; 

import { createContext, useState, useContext, ReactNode } from "react";

// Membuat context untuk tema
const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode; // Menentukan tipe children
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
  