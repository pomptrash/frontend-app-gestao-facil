import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
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
    clientData:{
        gap: 20,
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderRightWidth: 2,
        borderBottomColor: '#4445',
        borderRightColor: '#4445',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15
    },
    clientDataTitle:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    clientDataText:{
        fontSize: 16
    },
    notFoundText:{
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center'
    }
})