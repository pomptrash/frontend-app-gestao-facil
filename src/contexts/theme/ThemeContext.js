import { createContext, useContext, useState, useEffect } from "react";
import { lightColors, darkColors } from "./colors";
import { PaperProvider } from "react-native-paper";

const ThemeContext = createContext()

export function ThemeProvider({children}){
    const [darkMode, setDarkMode] = useState(true)
    const [theme, setTheme] = useState(darkMode? darkColors: lightColors)

    useEffect(()=>{
        setTheme(darkMode? darkColors: lightColors)
    },[darkMode])

    function toggleTheme(){
        setDarkMode(!darkMode)
    }
    
    return(
        <PaperProvider theme={theme}>
            <ThemeContext.Provider value={{ paperTheme: theme, theme: theme.colors, darkMode, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </PaperProvider>

    )
}

export function useTheme(){
    return useContext(ThemeContext)
}