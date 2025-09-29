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
    services:{
        padding: 5,
    },
    servicesData:{
        gap: 10,
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderRightWidth: 2,
        borderBottomColor: '#4445',
        borderRightColor: '#4445',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15
    },
    serviceDataTitle:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    serviceDataText:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    notFoundText:{
        fontSize: 16,
        fontWeight:'bold',
        textAlign:'center'
    }
})