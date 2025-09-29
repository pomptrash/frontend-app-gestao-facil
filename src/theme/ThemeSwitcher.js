import { TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "./ThemeContext";
import { Feather } from '@expo/vector-icons'

export function ThemeSwitcher({onPress}){

    const {darkMode, toggleTheme} = useTheme()

    return(
        <TouchableOpacity style={style.icon} onPress={()=> toggleTheme()} >
            <Feather name={darkMode? 'sun': 'moon'} color={darkMode? 'white': 'black'} size={20}/>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    icon:{
        position:'absolute',
        top: 50,
        right: 20
    }
})