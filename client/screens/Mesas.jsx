import React, {useEffect, useState} from 'react';
import { TouchableOpacity, StyleSheet, Image} from 'react-native';
import {View, Text} from 'dripsy'
import { TextInput } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import { ADD_USERMESA } from '../apollo/pairProgramming';
import { useMutation } from '@apollo/client';
import {styles} from '../styles/MesaStyle';

export default function Mesa({ navigation, users, id }){
    const [personas, setPersonas] = useState(users.length)
    const [idMesa, setIdMesa] = useState(id)
    const userName = localStorage.getItem('userName')
    const [mesa, setMesa] = useState()

    const [addUserPairProgramming] = useMutation(ADD_USERMESA);
    const handleSubmit = async () => {
        const response = await addUserPairProgramming({
            variables: {
                username: userName,
                id: idMesa,
            }
        })
        console.log(response.data.addUserPairProgramming)
        setMesa(response.data.addUserPairProgramming)
        const idMesa2 = localStorage.setItem('idMesa', idMesa);
        const { errors, success } = response.data.addUserPairProgramming
        navigation.navigate('SalaDeMesa');
    }
           

    const mesaLlena = () =>{
        if(personas === 5){
            return (
                <View style={{flex: 1, margin: 20}} >
                <View style={styles.container}>
                    <View style={styles.cuadroDisabled} sx={{width: [300, 500]}}>
                        <View >
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{idMesa}</Text>
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
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{idMesa}</Text>
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



