import React, {useEffect, useState} from 'react';
import { TouchableOpacity, StyleSheet, Image} from 'react-native';
import {View, Text} from 'dripsy'
import { ADD_USERMESA } from '../apollo/pairProgramming';
import { gql, useMutation, useQuery } from '@apollo/client';
import {styles} from '../styles/MesaStyle';

const GET_MESA = gql`
query pairProgramming($_id: String) {
    pairProgramming(where: {_id: $_id}) {
        users {
            username
        }
    }
}`

export default function Mesa({ navigation, users, id, cant }){
    const [personas, setPersonas] = useState(users.length)
    const [idMesa, setIdMesa] = useState(id)
    const userName = localStorage.getItem('userName')
    
    const {loading, data, error, refetch} = useQuery(GET_MESA, {
        variables: {
            _id: idMesa
        }
    })

    function onRefresh() {
        let userLength = (data?.pairProgramming[0].users.length)
        setPersonas(userLength)
        refetch()
    }
    
    useEffect(() => {
        refetch()
        onRefresh()
    })

    useEffect(() => {
        refetch()
    })

    const [addUserPairProgramming] = useMutation(ADD_USERMESA);
    const handleSubmit = async () => {
        await addUserPairProgramming({
            variables: {
                username: userName,
                id: idMesa,
            }
        })
        localStorage.setItem('idMesa', idMesa);
        navigation.navigate('SalaDeMesaNew');
    }

    const mesaLlena = () =>{
        if(personas === 5){
            return (
                <View style={{flex: 1, margin: 20}} >
                    <View style={styles.container}>
                        <View style={styles.cuadroDisabled} sx={{width: [300, 500]}}>
                            <View >
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mesa Nº{cant}</Text>
                            </View>
                            <Text style={{fontSize: 18, fontWeight: 'bold', marginTop:10}}>Alumnos: {personas}/5</Text>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>Mesa Llena!</Text>
                            <TouchableOpacity style={styles.botonDisabled} onPress={handleSubmit} disabled={personas === 5}>
                                <Text style={{fontWeight: 'bold'}}>Unirse</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
        else return (
            <View style={{flex: 1, margin: 20}} >
                <View style={styles.container}>
                    <View style={styles.cuadro} sx={{width: [300, 500]}}>
                        <View >
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Mesa Nº{cant}</Text>
                        </View>
                        <Text style={{fontSize: 18, fontWeight: 'bold', marginTop:10}}>Alumnos: {personas}/5</Text>
                        <TouchableOpacity style={styles.botonMesa} onPress={handleSubmit} disabled={personas === 5}>
                            <Text style={{fontWeight: 'bold'}}>Unirse</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
        
    }

    return (
        <View>
            {mesaLlena()}
        </View>
    )
}



