import React from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from '../styles/SalaMesaStyle';

export default function SalaDeMesa({ navigation }){
    return (
        <View style={styles.todo}>
            <Image
                source={require("../assets/FondoAmarillo.png")}
                style={{width: '100%', position: 'absolute', height: '70%'}}
            ></Image>
            <View style={styles.container}>
                <Text style={{fontSize: 25}}>Sala de la Mesa</Text>
            </View>
        </View>
    )
}