import React from 'react';
import { View } from 'dripsy';
import Mesa from './Mesa';

const Mesas = ({ navigation, type, mesas }) => {
    return (
        <View>
            {mesas.map(mesa => (
                <Mesa
                    key={mesa.id}
                    navigation={navigation}
                    type={type}
                    users={mesa.users}
                    leads={mesa.leads}
                />
            ))}
        </View>
    );
}

export default Mesas;