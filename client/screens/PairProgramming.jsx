import React from 'react';
import { View, Text } from 'dripsy'
import { TouchableOpacity, Image} from 'react-native';
import { GET_MESASCOHORTE, ADD_USERMESA } from '../apollo/pairProgramming';
import { useQuery, useMutation } from '@apollo/client';
import {styles} from '../styles/MesaStyle';
import Mesa from './Mesas';
import moment from 'moment';

export default function Mesas({navigation}){
    const fecha = moment().format('DD/MM/YYYY');
    const idMesa = localStorage.getItem('idMesa')
    const cohorte = localStorage.getItem('Cohorte');
    const userName = localStorage.getItem('userName')
    const { loading, data, error, refetch } = useQuery(GET_MESASCOHORTE, {
        variables: {
            cohorte: cohorte,
            dia: fecha
        }
    })
    const [addUserPairProgramming] = useMutation(ADD_USERMESA);
    const handleSubmit = async () => {
        const response = await addUserPairProgramming({
            variables: {
                username: userName,
            }
        })
        const id = response.data.addUserPairProgramming._id
        localStorage.setItem('idMesa', id);
        navigation.navigate('SalaDeMesa');
    } 

    function Sala () {
        var cant = 0;
        if (data?.pairProgramming.length === 0){
            return (
                <View style={styles.container}>
                    <Text sx={{fontSize: [30, 50], fontWeight: 'bold', textAlign: 'center'}}>Sala Vacia</Text>
                    <View style={styles.botonSalaVacia} sx={{width: [250, 400], height: [50, 70]}}>
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text style={{textAlign: 'center', fontWeight: 'bold'}} sx={{fontSize: [15, 22]}}>Se el primero en crear una mesa!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else return (
            <View >  
                <Text sx={{fontSize: [30, 50], fontWeight: 'bold', textAlign: 'center'}}>Salas </Text>
                {
                    data?.pairProgramming.map(m => {
                        cant += 1
                        return <Mesa navigation={navigation} users={m.users} id={m._id} cant={cant}/>
                    })
                }
            </View>
        )
    }
    
    function mostrar(){
        if(!idMesa){
            return Sala()
        }
        else return navigation.navigate('SalaDeMesa')   
    }

    return(
        <View style={styles.todo}>
            <Image
                source={require("../assets/FondoAmarillo.png")}
                style={{width: '100%', position: 'absolute', height: '60%'}}
            ></Image>
            {mostrar()}
        </View>
    )
}