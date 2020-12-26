import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'dripsy';
import { PAIR_PROGRAMMING, STAND_UP, LIMIT_USERS_PAIR } from '../constants/index';
import { useJoinRoom } from '../hooks';
import { styles } from '../styles/MesaStyle';

const Mesa = ({ navigation, type, users, leads }) => {

    const [handleJoin] = useJoinRoom(type);
    const isFull = () => {
        return users.length === LIMIT_USERS_PAIR ? true : false;
    }

    const isEmpty = () => {
        return users.length === 0 ? true : false;
    }

    const handleSubmit = () => {
        handleJoin('Bryan00');
        navigation.navigate('SalaDeMesa');
    }

    return (
        <View style={{ flex: 1, margin: 20 }} >
            <View style={styles.container}>
                <View style={isFull() ? styles.cuadroDisabled : styles.cuadro} sx={{ width: [300, 500] }}>
                    {type === STAND_UP &&
                        <View>
                            {leads.map(user => <Text key={user._id}>{`PM: ${user.firstName} ${user.lastName}`}</Text>)}
                        </View>
                    }
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>{`En Linea: ${users.length}`}</Text>
                    {isFull()
                        ?
                        <TouchableOpacity style={styles.botonDisabled} disabled>
                            <Text style={{ fontWeight: 'bold' }}>Full</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.botonMesa} onPress={handleSubmit}>
                            <Text style={{ fontWeight: 'bold' }}>Unirse</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
}

export default Mesa;