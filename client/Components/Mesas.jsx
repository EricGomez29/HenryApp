import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'dripsy';
import Mesa from './Mesa';
import { useJoinRoom } from '../hooks';
import { styles } from '../styles/MesaStyle';

const Mesas = ({ navigation, type, mesas }) => {
    const [handleJoin] = useJoinRoom(type);
    const isEmpty = () => {
        return mesas.length === 0 ? true : false;
    }

    const handleSubmit = () => {
        handleJoin(type);
    }

    if (isEmpty()) {
        return (
            <View style={styles.container}>
                <Text sx={{ fontSize: [30, 50], fontWeight: 'bold', textAlign: 'center' }}>Sala Vacia</Text>
                <View style={styles.botonSalaVacia} sx={{ width: [250, 400], height: [50, 70] }}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold' }} sx={{ fontSize: [15, 22] }}>Se el primero en crear una mesa!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            <View>
                {mesas.map(mesa => (
                    <Mesa
                        key={mesa._id}
                        navigation={navigation}
                        type={type}
                        users={mesa.users}
                        leads={mesa.leads}
                    />
                ))}
            </View>
        );
    }


}

export default Mesas;