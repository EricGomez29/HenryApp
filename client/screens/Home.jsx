import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/HomeStyle'
import { Text, Image } from 'dripsy';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {

    // function findUser() {
        const findUser = async () => {
            try {
              const value = await AsyncStorage.getItem('userEmail')
              if(!value) {
                navigation.navigate('PruebaBoton')
              }
              else navigation.navigate('Welcome')
            } catch(e) {
                console.log(e)
            }
          }
    //     const dataStorage = AsyncStorage.getItem('userEmail')
    //     if(!dataStorage) {
    //         navigation.navigate('PruebaBoton')
    //     } else {
    //         navigation.navigate('Welcome')
    //     }
    // }

    return (
        <View style={styles.todo}>
            <Image
                source={require("../assets/FondoAmarillo2.png")}
                style={{width: '100%', position: 'absolute', height: '70%'}}
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
