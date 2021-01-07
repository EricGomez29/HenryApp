import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    todo:{
        display: 'flex', 
        width: '100%', 
        height: '100%', 
        backgroundColor: '#161b22'
        // backgroundColor: 'white'
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,  
    },
    homeHenry: {
        width: 250,
        height: 200,
      },
})