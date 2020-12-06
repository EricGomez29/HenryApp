import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { 
    View,
    TouchableOpacity, 
    StyleSheet, 
    Text,
    Image
} from 'react-native';

export default function Home({navigation}){
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Login')} >
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    Comenzar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

// Estilos

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boton: {
        width: 200,
        height: 50,
        backgroundColor: '#FFFF01',
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center", 
    }
  });