import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {styles} from '../styles/SalaMesaStyle';
import TarjetaUser from '../Components/TarjetaUser';
import {GET_MESA, REMOVE_MESA, ADD_LINK} from '../apollo/pairProgramming';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import * as WebBrowser from 'expo-web-browser';

export default function SalaDeMesa({ navigation }){
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
    const [link, setLink] = useState(false)
    const usuarios = data?.pairProgramming[0].users;

    function handlePress (){
        
        WebBrowser.openBrowserAsync('http://meet.google.com/new');
    }
    function handlePress2 (){
        WebBrowser.openBrowserAsync(link);
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
            return (<Text style={{color: 'blue'}}>  {linkMeet}</Text>)
        }
        else return (<Text style={{color: 'blue'}}>  {link}</Text>)
    }

    return (
        <View style={styles.todo}>
            <Image
                source={require("../assets/FondoAmarillo.png")}
                style={{width: '100%', position: 'absolute', height: '70%'}}
            ></Image>
            <View style={{alignItems: "center"}}>
                <Text style={{fontSize: 25}}>Crea una reunion:  
                <TouchableOpacity onPress={handlePress}>
                    <Text style={{fontSize: 25, color: 'blue'}}>  meet.google.com/new</Text>
                </TouchableOpacity>
                </Text>

                <Text style={{marginTop: 10}}>Ponga el codigo de la reunion aqui:   
                    <TextInput style={styles.input} onChangeText={(e) => setValue(e)}/>
                    <TouchableOpacity onPress={handleLink} style={styles.fijar}><Text>Fijar</Text></TouchableOpacity>
                </Text>
                <View style={styles.linkFijado}>
                    <TouchableOpacity onPress={handlePress2}>
                            <Text style={styles.link}> Link de la reunion: 
                            {linkk()}
                            </Text>

                    </TouchableOpacity>
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