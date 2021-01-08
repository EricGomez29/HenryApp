
import { Container } from 'dripsy';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    tarjeta:{
        width:200,
        borderWidth: 0.5,
        borderColor: '#dbdbdb',
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 15,
        shadowColor: "gray",
        shadowOffset: {
            width: 2,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    todo:{
        marginTop: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    nombre:{
        fontSize: 23,
        marginTop: 10,
        fontWeight: "bold"
    },
    apellido:{
        fontSize: 19,
        fontWeight: "bold",
        marginBottom: 15
    },
    container:{
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10
    },
    list: {
        borderRadius: 20
    },
    content: {
        height: 30,
        padding: 10,
        borderColor: '#0000005c'
    }
})