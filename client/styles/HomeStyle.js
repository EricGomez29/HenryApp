import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    todo:{
        display: 'flex', 
        height: '99.8%', 
        backgroundColor: 'black',
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        zIndex: 5
    },
    homeApp: {
        marginTop: -70,
        fontSize: 50,
        fontWeight: "bold",
        color: "black",
        textShadowColor: 'white',
        textShadowOffset: {width: 3, height: 3},
        zIndex: -1
    },
    homeBoton: {
        marginTop: 60,
        width: 250,
        height: 60,
        backgroundColor: 'yellow',
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center", 
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9
    },
    homeHenry: {
        width: 250,
        height: 200,
        zIndex: -1
    },
})