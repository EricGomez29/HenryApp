import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    containerBoton: {
        alignSelf: "center"
    },
    boton: {
        marginTop: 10,
        width: 180,
        height: 40,
        backgroundColor: '#FFFF01',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginVertical: 20,
    },
    form: {
        marginTop: 20,
    },
    textLabel: {
        color: '#777777',
        marginBottom: 5,
        marginTop: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#BBD2C5",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#FFF9"
    },
    warning: {
        borderWidth: 2,
        borderColor: "red",
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        alignItems: "center"
    }
})