import React from 'react';
import { View } from 'dripsy';
import Mesa from './Mesa';

const Mesas = ({ type, mesas }) => {
    return (
        <View>
            {mesas.map(mesa => (
                <Mesa
                    key={mesa.id}
                    type={type}
                    users={mesa.users}
                    leader={mesa.users[0]}
                />
            ))}
        </View>
    );
}

export default Mesas;