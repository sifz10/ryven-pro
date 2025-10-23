import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Check localStorage or system preference
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('theme');
            
            // Validate stored theme - must be 'light' or 'dark'
            if (stored && (stored === 'light' || stored === 'dark')) {
                return stored;
            }
            
            // Clear invalid data from localStorage
            if (stored) {
                localStorage.removeItem('theme');
            }
            
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        
        // Ensure theme is valid before applying
        if (theme !== 'light' && theme !== 'dark') {
            console.error('Invalid theme value:', theme);
            setTheme('light');
            return;
        }
        
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

