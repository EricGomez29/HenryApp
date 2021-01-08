import React, { useEffect, useState } from 'react';
import { View, Text } from 'dripsy'
import { TouchableOpacity, Image} from 'react-native';
import { GET_MESASCOHORTE, ADD_USERMESA } from '../apollo/pairProgramming';
import { useQuery, useMutation } from '@apollo/client';
import {styles} from '../styles/MesaStyle';
import Mesa from './Mesas';
import moment from 'moment';
import Particles from './Particles';
import MenuDesplegable from './MenuDesplegable';
import zzz from '../assets/zzz.png';

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

    const [btn, setBtn] = useState(false)
    const btnMesa = () => {
        var count = 0;
        data?.pairProgramming.map((u,i) => {
            count += 1
        })
        // var count2 = data?.pairProgramming[count - 1].users.length || 0
        if(count % 5 === 0) {
            return (
                <View style={styles.container}>
                    <View style={styles.botonSalaVacia} sx={{width: [250, 400], height: [50, 70]}}>
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text style={{textAlign: 'center', fontWeight: 'bold'}} sx={{fontSize: [15, 22]}}>Crear Mesa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
    const [mesas, setMesas] = useState()
    function onRefresh() {
        var mesasActuales = []
        data && data?.pairProgramming.map((m, i) => {
            mesasActuales.push(m)
        })
        setMesas(mesasActuales)
        refetch()
    }

    useEffect(() => {
        refetch
        onRefresh()
    }, [data && data?.pairProgramming.length])

    useEffect(() => {
        refetch()
    })

    function Sala () {
        if (data?.pairProgramming.length === 0){
            return (
                <View style={styles.container2}>
                    <Text sx={{fontSize: [30, 50], fontWeight: 'bold', textAlign: 'center', color: "white"}}>Sala Vacia</Text>
                    <View style={{width: 150, height: 150, marginTop: 40}}>
                        <Image source={zzz} style={{width: 150, height: 150}}/>
                    </View>
                </View>
            )
        }
        else return (
            <View >  
                <Text sx={{fontSize: [30, 50], fontWeight: 'bold', textAlign: 'center', color: "white"}}>Salas</Text>
                {
                    mesas && mesas.map((m, i) => {
                        i += 1
                        return <Mesa key={i} navigation={navigation} users={m.users} id={m._id} cant={i}/>
                    })
                }
            </View>
        )
    }
    
    function mostrar(){
        if(!idMesa){
            return Sala()
        }
        else return navigation.navigate('SalaDeMesaNew')   
    }
    
    return(
        <View style={styles.todo}>
            <MenuDesplegable navigation={navigation}/>
            <View style={{width: '100%', height: '99%', position: 'absolute', zIndex: -1}}>
                <Particles />
            </View>
            {mostrar()}
            {btnMesa()}
        </View>
    )
}