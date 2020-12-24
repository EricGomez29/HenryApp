import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'dripsy';

import { styles } from '../styles/MesaStyle';

const Mesa = ({ type, users, leader }) => {

    const isFull = () => {
        return users.length === 5 ? true : false
    }

    return (
        <View style={{ flex: 1, margin: 20 }} >
            <View style={styles.container}>
                <View style={styles.cuadro} sx={{ width: [300, 500] }}>
                    <View >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{type.name}</Text>
                    </View>
                    <View>
                        <Text>{leader.username}</Text>
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>{users.length}</Text>
                    <TouchableOpacity style={styles.botonMesa}>
                        <Text style={{ fontWeight: 'bold' }}>Unirse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Mesa;