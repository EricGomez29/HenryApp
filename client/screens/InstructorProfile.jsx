import React, { useEffect } from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {GET_USERCOHORTES} from '../apollo/user';
import Particles from './Particles';
import { useQuery } from '@apollo/client';

export default function IntructorProfile({navigation}){
    const cohorte = localStorage.getItem('Cohorte')
    const numero = parseInt(cohorte)
    const { loading, data, error } = useQuery(GET_USERCOHORTES, {
        variables: {
            number: numero
        }
    })
    const instructor2 = data && data?.cohortes[0]?.instructor
    console.log(instructor2)

    function ir (time){
        return new Promise(resolve =>{
            setTimeout(resolve, time)
        })
    }
    useEffect(() => {
        if(data){
            ir(1000).then(() => navigation.navigate('ProfileUser', { data: instructor2}))
        }
    })

    return(
        <View style= {{flex: 1, justifyContent: "center", flexDirection: "row", padding: 10, backgroundColor: 'black'}}>
            <ActivityIndicator size={50} color="yellow" />
        </View>
    )
    
}