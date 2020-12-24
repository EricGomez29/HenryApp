import React from 'react';
import Mesa from '../Components/Mesa';

const StandUp = ({ navigation, me }) => {
    return (
        <Mesa
            type={{ name: 'stand-up' }}
            users={['1', '2', '3']}
        />
    );
}

export default StandUp;