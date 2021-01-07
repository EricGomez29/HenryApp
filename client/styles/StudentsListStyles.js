import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        textAlign: "center",
        alignItems: "center",
        height: '100%'
    },
    title: {
        fontSize: 50,
        fontWeight: "bold",
        marginTop: 30,
        color: "white"
    },
    line: {
        height: 110,
        borderBottomWidth: 21,
        borderBottomColor: "yellow",
    },
    containerInput: {
        display: "flex", 
        flexDirection: "row", 
        width: '90%', 
        paddingVertical: 20
    },
    dropDrown: {
        marginTop: 40, 
        marginBottom: 30, 
        display: "flex", 
        zIndex: 2,
        fontSize: 30,
        backgroundColor: '#fff9',
        width: '40%',
        padding: 5
    },
    textInput: {
        width: '100%',
        height: 30,
        paddingLeft: 20,
        backgroundColor: '#fff9',
        color: "black"
    },
})