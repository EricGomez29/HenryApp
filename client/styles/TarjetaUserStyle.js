
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
        display: 'flex',
        width: "100%",
        justifyContent: "center"

    }

})