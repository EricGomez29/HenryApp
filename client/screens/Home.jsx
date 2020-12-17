import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/HomeStyle'
import { Text, Image } from 'dripsy';

export default function Home({ navigation }) {

    function findUser() {
        const dataStorage = localStorage.getItem('userEmail')
        if(!dataStorage) {
            navigation.navigate('PruebaBoton')
        } else {
            navigation.navigate('Welcome')
        }
    }

    return (
        <View style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: 'white' }}>
            <Image
                source={require("../assets/FondoAmarillo.png")}
                style={{ width: '100%', position: 'absolute', height: '70%' }}
            // sx={{height: [300, 500]}}
            ></Image>
            <View style={styles.container}>
                <Image
                    source={require("../assets/henry.png")}
                    resizeMode="contain"
                    style={styles.homeHenry}
                ></Image>
                <Text style={styles.homeApp}>
                    A P P
                </Text>
                <View>
                    <TouchableOpacity style={styles.homeBoton} onPress={findUser}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Comenzar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
