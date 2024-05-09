import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('dark'); // Set default theme as 'dark'

  useEffect(() => {
    // Get the theme from localStorage on client-side only
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme);
  }, []);

  useEffect(() => {
    // Persist theme changes to localStorage on client-side only
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
