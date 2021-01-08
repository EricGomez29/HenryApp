import { StyleSheet } from 'react-native'

export const styless = StyleSheet.create({
    todo:{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        
    }, 
    title:{
        color: 'white', 
        alignSelf: 'center', 
        fontWeight: 'bold',
        marginBottom: 10
    },
    recuadro:{
        alignItems: 'center',
        backgroundColor: '#fff9',
        padding: 10
    },
    pmNombre:{
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: -20
    },
    pm:{
        backgroundColor: 'white',
        borderRadius: 5,
        width: 250,
        alignSelf: 'center'
    }
})