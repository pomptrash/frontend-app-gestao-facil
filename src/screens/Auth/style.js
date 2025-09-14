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
        alignSelf: 'center',
        color: theme.text,
        marginTop: 40,
    },

    label:{
        fontSize: 32,
        fontWeight:'bold',
        color: theme.text
    },

    form: {
        gap: 16
    },

    passwordInput:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },

    btnLogin:{
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        justifyContent:'center',
        alignItems:'center'
    },
    btnLoginText:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnExtra:{
        fontSize: 16,
        color: theme.text
    }
})