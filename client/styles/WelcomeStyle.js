import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    todo:{
        display: 'flex', 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'black'
    },
    boton: {
        display: 'flex',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 30,
        shadowColor: "white",
        shadowOffset: {
            width: 2,
            height: 6,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        borderWidth: 1,
        borderColor: 'white'
    },
    title: {
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    tarjeta:{
        position: 'absolute', 
        borderRadius: 30, 
        filter: "brightness(0.75)",
        // backgroundColor: 'black',
        // opacity: 0.6
        
    },
    botonCerrar:{
        width: 200,
        height: 50,
        backgroundColor: 'yellow',
        borderRadius: 50,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    container: {
        zIndex: 5,
        alignSelf: "center"
    }

})