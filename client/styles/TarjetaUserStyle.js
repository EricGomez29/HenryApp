
import { Container } from 'dripsy';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    tarjeta:{
        width:200,
        // height: 300,
        backgroundColor: 'white',
        borderRadius: 30,
        margin: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
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
        fontWeight: "bold"
    },
    container:{
        display: 'flex',
        width: "100%",
        flexDirection: "row",
        justifyContent: "center"

    }

})