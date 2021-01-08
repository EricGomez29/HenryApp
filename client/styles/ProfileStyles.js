import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    btn: {
        backgroundColor: '#FFFF01',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    userNavigation: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color:"white"
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
        color: "white"
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
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
    }
})