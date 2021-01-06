import React, {useState} from 'react';
import {Text, TouchableOpacity, TextInput, Image} from 'react-native';
import {View} from 'dripsy';
import {ADD_GRUPOSTAND, GET_COHORTES, GET_GRUPOSTAND } from '../apollo/standUp';
import {useMutation, useQuery} from '@apollo/client';
import {styles} from '../styles/AgregarStandStyles';
import {AdminList} from './Admin';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

export default function AgregarStand (){
    const [num, setNum] = useState()
    const {data, error, loading} = useQuery(GET_COHORTES)
    // const {data, error, loading} = useQuery(GET_GRUPOSTAND)
    const numCohorte = data?.cohortes
    const numero = []
    numCohorte && numCohorte.map(n => {
        numero.push({label: n.number.toString(), value: n.number.toString()})
    })
    const numNuevo= parseInt(num)
    const [addStand] = useMutation(ADD_GRUPOSTAND);

    const handleSubmit = async () => {
        const response = await addStand({
            variables: {
                cohorte: numNuevo,
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

            <View sx={{position: 'absolute', width: [0, 0, 200], opacity: [0, 0, 100], zIndex: [-1, -1, 1]}}>
                <AdminList/>
            </View>

            <View style={styles.container}>
            
                <Text style={styles.title}>Agregar grupo de Stand Up</Text>
                <View style={styles.cuadro}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <DropDownPicker
                            items={numero}
                            placeholder= 'Elegi el cohorte'
                            defaultValue={num}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setNum(item.value)}
                        />
                        
                        <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                            <Text style={{fontSize: 18, color: 'red'}}>Agregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}