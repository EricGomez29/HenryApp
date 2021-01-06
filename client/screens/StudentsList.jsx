import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import {styles} from '../styles/StudentsListStyles';

export default function StudentsList () {

    return (
        <View style={styles.container}>
            <View style={{width: '100%', height: 500, position: 'absolute'}}>
                <Image
                    source={require("../assets/FondoAmarillo2.png")}
                    style={{width: '100%', position: 'absolute', height: 500}}
                ></Image>
            </View>
            <View style={styles.line}>
                <Text style={styles.title}>
                    Alumnos
                </Text>
            </View>
            <View>
                
            </View>
        </View>
    )
};