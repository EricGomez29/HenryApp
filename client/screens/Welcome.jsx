import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default function Welcome( { navigation } ){
    return (
        <View>
            <TouchableOpacity>
                <View>
                    <Text>BIENVENIDO!</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}