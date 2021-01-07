import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    input:{
        width: 150,
        height: 50,
        borderBottomWidth: 1.5,
        borderBottomColor: 'gray'
    },
    container: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        marginTop: 20
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'ui-rounded',
        
    },
    title2: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'ui-rounded',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 2},
    },
    subtitle: {
        fontSize: 20,
        marginTop: 10
    },
    boton: {
        width: 90,
        height: 38,
        justifyContent: 'center',
        opacity: '50%',
        borderRadius: 5,
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,

    },
    cuadro:{
        width: 300,
        height: 150,
        borderRadius: 5,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,

    },
    grupos:{
        display: 'flex',
        alignItems: 'center',
        marginTop: 50
    },
    nombres: {
        fontSize: 18,
        // fontWeight: 'bold'
    },
    gruposStand:{
        width: 300,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    recuadro:{
        backgroundColor: '#ffffff99',
        alignItems: 'center'
    }
})