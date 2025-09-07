import { StyleSheet } from "react-native";

export const getGlobalStyles = (theme) => StyleSheet.create({
    text:{
        color: theme.text
    },
    background:{
        backgroundColor: theme.background
    },
    
})