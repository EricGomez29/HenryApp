import React, {useState} from 'react';
import {View} from 'react-native';
import {Text} from 'dripsy'
import Mesas from '../Components/Mesas';
import Particles from './Particles';
import {styles} from '../styles/StandUpStyles';
import { useMutation, useQuery } from '@apollo/client';
import {GET_USER} from '../apollo/user';
import {GET_GRUPO} from '../apollo/standUp';
import Menu from './MenuDesplegable';
import TarjetaUser from '../Components/TarjetaUser';

export default function StandUp({navigation}){
    const email = localStorage.getItem('userEmail')
    const { loading, data, error } = useQuery(GET_USER, {
        variables: {
            email,
        }
    })
    const [newData, setNewData] = useState()
    const nombreGrupo = data?.users[0]?.standUp
    
    const {loading: loading2, data: data2, error: error2 } = useQuery(GET_GRUPO, {
        variables: {
            name: nombreGrupo
        }
    })

    const usuarios = data2?.standup[0]?.users
    const pms = data2?.standup[0]?.PM

    return (
        <View style={styles.todo}>
            <View style={{width: '100%', height: '100%', position: 'absolute', zIndex: -1}}>
                <Particles />
            </View>
            <View style={{zIndex: 5}}>
                    <Menu navigation={navigation} />
                </View>
            <View style={{alignSelf: 'center'}}>
                <Text style={styles.title} sx={{fontSize: [25, 30]}}>Grupo:  {nombreGrupo}</Text>
                <View style={styles.recuadro}>
                    
                        <TarjetaUser users={usuarios} />
                    
                </View>
            </View>
        </View>
    )
}