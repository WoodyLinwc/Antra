import { createContext, useState, useContext } from "react";

// create the context with a default value
const ThemeContext = createContext();

// custom hook for using the theme context
export function useTheme(){
    const context = useContext(ThemeContext);
    if(context === undefined){
        throw new Error('useThem must be used within a ThemeProvider')
    }
    return context;
}

// Provider component to wrap around components that need access to the theme
export function ThemeProvider({children}){
    const [theme, setTheme] = useState('light');

    // toggle between light and dark themes
    const toggleTheme = () =>{
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    // value object to pass through the context
    const value = {
        theme,
        toggleTheme,
        isDark: theme === 'dark'
    };

    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}