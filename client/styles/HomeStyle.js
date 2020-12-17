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
    homeApp: {
        marginTop: -70,
        fontSize: 50,
        fontWeight: "bold",
        color: "black"
    },
    homeBoton: {
        marginTop: 60,
        marginBottom: 25,
        width: 250,
        height: 60,
        backgroundColor: 'yellow',
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",   
    },
    homeHenry: {
        width: 250,
        height: 200,
      },
})