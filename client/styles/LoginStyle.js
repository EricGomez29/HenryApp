import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    cuadro:{
        width:'80%',
        height: '70%',
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    boton: {
        marginTop: 50,
        width: 150,
        height: 50,
        backgroundColor: 'yellow',
        borderRadius: 100,
        
        justifyContent: "center",   
    },
    containerBoton:{
        alignSelf: "center"
    },
    errorForm: {
        fontSize: 12, 
        color: 'red',
        marginTop: 5,
    },
    imgHenry: {
        width: 150,
        height: 150,
        zIndex: 1,
    },
    botones:{
        width: '90%',
        borderRadius: 100,
        backgroundColor: 'red',
        height: 70,
        
    },
    
})