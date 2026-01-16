import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeColor } from '../types';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  color: ThemeColor;
  changeColor: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme_mode');
    return saved ? JSON.parse(saved) : false;
  });

  const [color, setColor] = useState<ThemeColor>(() => {
    return (localStorage.getItem('theme_color') as ThemeColor) || 'blue';
  });

  useEffect(() => {
    localStorage.setItem('theme_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('theme_color', color);
    // Update CSS variables for Tailwind
    const root = document.documentElement;
    const colors: any = {
      blue: { 50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' },
      purple: { 50: '#f5f3ff', 100: '#ede9fe', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9' },
      emerald: { 50: '#ecfdf5', 100: '#d1fae5', 500: '#10b981', 600: '#059669', 700: '#047857' },
      rose: { 50: '#fff1f2', 100: '#ffe4e6', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c' },
      amber: { 50: '#fffbeb', 100: '#fef3c7', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
    };

    const selected = colors[color];
    root.style.setProperty('--color-primary-50', selected[50]);
    root.style.setProperty('--color-primary-100', selected[100]);
    root.style.setProperty('--color-primary-500', selected[500]);
    root.style.setProperty('--color-primary-600', selected[600]);
    root.style.setProperty('--color-primary-700', selected[700]);

  }, [color]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const changeColor = (c: ThemeColor) => setColor(c);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, color, changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};