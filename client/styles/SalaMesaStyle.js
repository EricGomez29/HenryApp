import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    todo:{
        display: 'flex', 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        
    },
    botonSalir:{
        width: 200,
        height: 50,
        backgroundColor: 'yellow',
        borderRadius: 50,
        alignItems: "center",
        justifyContent: 'center',
        margin: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    containerBoton: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25
    },
    input:{
        width: 200,
        borderBottomColor: 'gray',
        borderBottomWidth: 'thin',
        marginLeft: 10,
        marginRight: 10
        // borderWidth: 1,
        // borderColor: 'gray'
    },
    fijar:{
        width: 50,
        height: 20,
        backgroundColor: '#d7d2d2',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 5
    },
    link:{
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: 30
    },
    linkFijado:{
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
})