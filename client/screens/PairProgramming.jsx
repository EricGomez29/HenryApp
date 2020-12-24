import React from 'react';
import Mesas from '../Components/Mesas';
import { View, Text } from 'dripsy'
import { PAIR_PROGRAMMING } from '../constants';
import { GET_MESASCOHORTE } from '../apollo/pairProgramming';
import { useQuery, useMutation } from '@apollo/client';

const PairProgramming = ({ navigation }) => {
    const cohorte = localStorage.getItem('Cohorte');
    const userName = localStorage.getItem('userName');

    const { loading, data } = useQuery(GET_MESASCOHORTE, {
        variables: {
            cohorte,
        },
        pollInterval: 2000,
    })

    if (loading) {
        return <View><Text>Loading...</Text></View>
    } else {
        return (
            <Mesas
                navigation={navigation}
                type={PAIR_PROGRAMMING}
                mesas={data.mesas}
            />
        );
    }

}

export default PairProgramming;