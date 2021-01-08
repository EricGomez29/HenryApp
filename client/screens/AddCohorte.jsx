import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import {View} from 'dripsy';
import { GET_COHORTES  } from '../apollo/standUp';

import { ADD_COHORTE  } from '../apollo/cohorte';
import {useMutation, useQuery} from '@apollo/client';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import Particles from './Particles'
import { ListItem, Avatar } from 'react-native-elements';
import DateTimePicker from './DateTimePicker'

export default function AddCohorte ({navigation}){
    
    const [newCohorte, setNewCohorte] = useState();
    const [bool, setBool] = useState(false);
    const {data, error, loading} = useQuery(GET_COHORTES)
    
    const [addCohorte] = useMutation(ADD_COHORTE);

    const addNewCohorte = async (fecha) => {
        console.log(fecha)
        try {
            const response = await addCohorte();
            setNewCohorte(response.data.addCohorte);
            setBool(true)
            console.log(response)
        }
        catch(error){
            console.log(error);
        }
    }    
 

        
    return (
        <View style={{zIndex:0, backgroundColor:"white", width: '100%', height: '99%', display: "flex", justifyContent:"center", alignItems:"center"}}>
            {/* <View style={{width: '100%', height: '99%', position: 'absolute', zIndex: 1}}>
                <Particles style={{zIndex:0}}/>
            </View> */}
            <View key={1} onPress={addNewCohorte} style={{zIndex:6, marginBottom:"10%", width:"80%", heigth:"15%"}}>
                <TouchableOpacity style={{padding:10,borderRadius:25, backgroundColor:"yellow", display:"flex", justifyContent:"center"}}  onPress={addNewCohorte} >
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize:"80%" }}>Agregar Nuevo Cohorte</Text>
                </TouchableOpacity>
            </View>
            {!bool ? null : 
                <DateTimePicker id={newCohorte._id} /> 
            }
        </View>
    )
}
