import React from 'react';
import { View } from 'dripsy';
import Mesa from './Mesa';
import { styles } from '../styles/MesaStyle';
import { ADD_USERMESA } from '../apollo/pairProgramming';

const Mesas = ({ navigation, type, mesas }) => {

    const isEmpty = () => {
        return mesas.length === 0 ? true : false;
    }

    const handleSubmit = async () => {
        const response = await joinRoom({
            variables: {
                username: userName,
            }
        })
        console.log(response);
    }

    const [joinRoom] = useMutation(setMutation());

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