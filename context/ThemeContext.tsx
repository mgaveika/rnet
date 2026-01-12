import { createContext, useContext, ReactNode } from "react";
import { useColorScheme } from "nativewind";

export type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    darkMode: boolean;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();

    const theme = colorScheme as Theme;
    const darkMode = colorScheme === 'dark';

    const setTheme = (newTheme: Theme) => {
        setColorScheme(newTheme);
    };

    const toggleTheme = () => {
        toggleColorScheme();
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme, darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

