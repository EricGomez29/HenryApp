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
        marginTop: 20
    },
    errorForm: {
        fontSize: 12, 
        color: 'red',
        marginTop: 5,
    },
    input:{
        height: 50,
        width: 200,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
        
    },
})