import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
    },
    boton: {
        marginTop: 10,
        width: 180,
        height: 40,
        backgroundColor: 'yellow',
        borderRadius: 100,
        justifyContent: "center",
        alignItems: 'center'   
    },
    containerBoton:{
        marginTop: 20,
        alignSelf: "center"
    },
    errorForm: {
        fontSize: 12, 
        color: 'red',
        marginTop: 5,
    },
    olvideContraseña:{
        backgroundColor: 'transparent',
        marginTop: 8
    },
    input:{
        height: 50,
        width: 230,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingLeft: 10
    },
    errorMessage: {
        color: "red",
        fontFamily: "-webkit-pictograph"
    },
})