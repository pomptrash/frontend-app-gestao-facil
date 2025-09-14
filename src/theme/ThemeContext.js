import { createContext, useContext, useState, useEffect } from "react";
import { lightColors, darkColors } from "./colors";

const ThemeContext = createContext()

export function ThemeProvider({children}){
    const [darkMode, setDarkMode] = useState('dark')
    const [theme, setTheme] = useState(darkMode? darkColors: lightColors)

    useEffect(()=>{
        setTheme(darkMode? darkColors: lightColors)
    },[darkMode])

    function toggleTheme(){
        setDarkMode(!darkMode)
    }
    
    return(
        <ThemeContext.Provider value={{theme, darkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>

    )
}

export function useTheme(){
    return useContext(ThemeContext)
}