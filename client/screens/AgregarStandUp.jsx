import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {ADD_GRUPOSTAND } from '../apollo/standUp';
import {useMutation} from '@apollo/client';
import {styles} from '../styles/AgregarStandStyles';
import {AdminList} from './Admin';

export default function AgregarStand (){
    const [num, setNum] = useState()
    const [addStand] = useMutation(ADD_GRUPOSTAND)
    console.log(num)
    const handleSubmit = async () => {
        const response = await addStand({
            variables: {
                cohorte: num,
            }
        })
        console.log(response)
    }
    

    return (
        <View >
            <View style={{width: '100%', height: 500, position: 'absolute'}}>
                <Image
                    source={require("../assets/FondoAmarillo2.png")}
                    style={{width: '100%', position: 'absolute', height: 500}}
                ></Image>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{position: 'relative'}}>
                    <AdminList/>
                </View>
                <View>
                    <Text>Hola</Text>
                    <TextInput 
                        style={styles.input}
                        keyboardType = 'number-pad'
                        onChangeText = {(n)=> setNum(n)}
                        value = {num}
                        />
                </View>
            </View>
        </View>
    )
}