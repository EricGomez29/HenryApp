import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    botones:{
        width: 280,
        backgroundColor: 'white',
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: 'row',
        height:50,
        zIndex: -1
    },
    boton:{
        backgroundColor: 'transparent',
        zIndex: 4,
        width: 140,
        justifyContent: "center"
    }
});