import { StyleSheet } from "react-native";

export const getStyle = (theme) => StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: theme.background
    },

    title:{
        fontSize: 32,
        fontWeight: 'bold',
        justifySelf: 'flex-start',
        color: theme.text
    },

    label:{
        fontSize: 32,
        color: theme.text
    },

    form: {
        gap: 15
    },

    btnLogin:{
        backgroundColor: '#007AFF',
        padding:  15,
        borderRadius: 8,
        justifyContent:'center',
        alignItems:'center'
    },
    btnLoginText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnForgotPW:{
        fontSize:16,
        color: theme.text
    }
})