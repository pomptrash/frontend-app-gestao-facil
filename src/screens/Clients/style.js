import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        padding: 8
    },
    header:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: 20
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10
    },
    clients:{
        gap: 20,
        padding: 10,
    },
    notFoundText:{
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center'
    }
})