import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
        alignSelf: "center",
        marginTop: 20, 
        
    },
    errorForm: {
        fontSize: 12, 
        color: 'red',
        marginTop: 5,
    },
    input:{
        height: 50,
        width: 230,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingLeft: 10
    },
    success: {
        padding: 10,
        marginTop: 5,
        marginBottom: 5,
        color: "green",
        textAlign: "center"
    }
})