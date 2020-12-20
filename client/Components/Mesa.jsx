import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'dripsy';

import { styles } from '../styles/MesaStyle';

const Mesa = ({ navigation, users, leader }) => {
    return (
        <View style={{ flex: 1, margin: 20 }} >
            <View style={styles.container}>
                <View style={styles.cuadroDisabled} sx={{ width: [300, 500] }}>
                    <View >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Mesa Nº: 1</Text>
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>Alumnos: {personas}/5</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>Mesa Llena!</Text>
                    <TouchableOpacity style={styles.botonDisabled} onPress={funcion} disabled={personas === 5}>
                        <Text style={{ fontWeight: 'bold' }}>Unirse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Mesa;