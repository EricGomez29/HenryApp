import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    todo:{
        display: 'flex', 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'black'
    },
    container:{
        alignItems: "center",
        justifyContent: "center"
    },
    botonMesa: {
        backgroundColor: 'yellow',
        borderRadius: 15,
        height: 30, 
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 0
    },
    botonDisabled:{
        backgroundColor: 'gray',
        borderRadius: 15,
        height: 30, 
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 0
    },
    botonSalaVacia:{
        backgroundColor: 'white',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
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
        height: 150,
        borderRadius: 30,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    cuadroDisabled:{
        height: 150,
        borderRadius: 30,
        backgroundColor: '#d4d3d3',
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    container2: {
        alignItems: "center",
        justifyContent: "center",
        height: "60%"
    }
})