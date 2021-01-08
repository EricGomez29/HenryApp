import React from 'react';
import {View, Text} from 'react-native';

export default function ImagenDefecto({nombre}){
    const letra = nombre[0]

    return (
        <View style={{width: 40, height: 40, backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>{letra}</Text>
        </View>
    )
}

