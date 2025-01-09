import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === 'light' ? 'light' : 'dark';
    });

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        document.documentElement.className = newTheme === 'light' ? 'light-mode' : 'dark-mode'
    }

    useEffect(() => {
        document.documentElement.className = theme === 'light' ? 'light-mode' : 'dark-mode'
        localStorage.setItem('theme', theme)
    }, [theme])

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}