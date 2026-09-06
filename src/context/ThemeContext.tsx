import React, { createContext, useContext } from 'react';
import { COLORS } from '../constants/theme';

interface ThemeContextType {
  colors: typeof COLORS;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: COLORS,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ colors: COLORS }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
