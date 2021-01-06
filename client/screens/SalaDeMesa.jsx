import React, {useState} from 'react';
import {Image, TouchableOpacity } from 'react-native';
import { View, Text, TextInput } from 'dripsy';
import {styles} from '../styles/SalaMesaStyle';
import TarjetaUser from '../Components/TarjetaUser';
import {GET_MESA, REMOVE_MESA, ADD_LINK} from '../apollo/pairProgramming';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import * as WebBrowser from 'expo-web-browser';

export default function SalaDeMesa({ navigation }){
    const hora = moment().format
    const fecha = moment().format('DD/MM/YYYY')
    const [value, setValue] = useState()
    const userName = localStorage.getItem('userName')
    const idMesa = localStorage.getItem('idMesa');
    const { loading, data, error } = useQuery(GET_MESA, {
        variables: {
            id: idMesa,
        }
    })
    const linkMeet = data?.pairProgramming[0].linkMeet
    console.log(linkMeet)
    const [link, setLink] = useState(false)
    const usuarios = data?.pairProgramming[0].users;

    function handlePress (){
        
        WebBrowser.openBrowserAsync('http://meet.google.com/new');
    }
    function handlePress2 (){
        WebBrowser.openBrowserAsync(linkMeet);
    }
   
    const [removeMesa] = useMutation(REMOVE_MESA);
    const handleSubmit = async () => {
        await removeMesa({
            variables: {
                username: userName,
                dia: fecha
            }
        })
        localStorage.removeItem('idMesa')
        navigation.navigate('Welcome');
    }
    const [addLink] =useMutation(ADD_LINK)
    const handleLink = async () => {
        setLink(value)
        await addLink({
            variables: {
                id: idMesa,
                link: value
            }
        })
    }

    const linkk = () => {
        if(link === false){
            return (<Text style={{color: '#6200ee'}}>  {linkMeet}</Text>)
        }
        else return (<Text style={{color: '#6200ee'}}>  {link}</Text>)
    }

    return (
        <View style={styles.todo}>
            <Image
                source={require("../assets/FondoAmarillo2.png")}
                style={{width: '100%', position: 'absolute', height: '70%'}}
            ></Image>
            <View style={{alignItems: "center"}}>
                <View style={{marginTop: 20}} >
                    <Text sx={{fontSize: [20,25], display: 'flex', alignItems: "center"}}>
                        Crea una reunion:   
                        <View style={styles.botonLink} sx={{width: [110, 150], height: [35, 40]}} >
                            <TouchableOpacity onPress={handlePress} >
                                <Text sx={{fontSize: [20,25], color: 'white'}}>Toca Aqui!</Text>
                            </TouchableOpacity>
                        </View> 
                    </Text>
                </View>

                <Text style={{marginTop: 10, display: 'flex'}}>
                    Copie el codigo del meet aqui:   
                    <TextInput style={styles.input} sx={{width: [100, 200]}} onChangeText={(e) => setValue(e)}/>
                    <TouchableOpacity onPress={handleLink} style={styles.fijar}><Text>Fijar</Text></TouchableOpacity>
                </Text>
                
                <View style={styles.linkFijado}>
                    <Text style={styles.link} sx={{fontSize:[20, 30], display: ['block', 'flex']}}> Link de la reunion: 
                        <TouchableOpacity onPress={handlePress2} >
                            <Text sx={{fontSize:[18, 30]}}>
                                {linkk()}
                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
            <View style={{display: 'flex', justifyContent: "center", alignItems: "center", width: '100%', height: '100%'}}>
                <TarjetaUser users= {usuarios}/>
                <View style={styles.containerBoton}>
                    <TouchableOpacity onPress={handleSubmit} style={styles.botonSalir}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Salir de la mesa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botonSalir} onPress={() => navigation.navigate('Welcome')}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Inicio</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}