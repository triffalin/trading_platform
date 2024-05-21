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

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>('dark'); // Set default theme as 'dark'

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

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
