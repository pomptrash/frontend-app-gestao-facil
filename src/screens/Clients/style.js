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
        padding: 5,
        marginBottom: 10
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5
    },
    clients:{
        padding: 8,
    },
    notFoundText:{
        flex:1,
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center'
    }
})