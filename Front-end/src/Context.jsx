import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getMode = () => {
  if (typeof window !== 'undefined') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedMode = localStorage.getItem('darkTheme');
    return storedMode !== null ? JSON.parse(storedMode) : prefersDark;
  }
  return false;
};


export const AppProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getMode());

  const toggleDark = () => {
    const newDarkTheme = !isDark;
    setIsDark(newDarkTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkTheme', JSON.stringify(newDarkTheme));
    }
  };

  useEffect(() => {
    const rootElement = document.querySelector("#root");
    if (isDark) {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  }, [isDark]);
  

  return (
    <AppContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
