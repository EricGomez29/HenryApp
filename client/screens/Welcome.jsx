import React, { useEffect, useState } from 'react';
import {  Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Image, View ,Text} from 'dripsy';
import { Container } from '../styled-components/Container'
import { GET_USER } from '../Querys/userQuery';
import { useQuery } from '@apollo/client';
import {styles} from '../styles/WelcomeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Welcome({ navigation }) {
   const [email2, setEmail2] = useState(false)
//    const [cohorte2, setCohorte2] = useState([])
//    const [userName2, setUserName2] = useState([])

   useEffect(() => {
       async function email() {
           try{
               const mail = await AsyncStorage.getItem('userEmail');
               const { loading, data, error } = useQuery(GET_USER, {
                   variables: {
                       mail,
                   }
               });
               const cohorte = data?.users[0].cohorte?.number;
               const userName = data?.users[0].username;
               await AsyncStorage.setItem('Cohorte', cohorte);
               await AsyncStorage.setItem('userName', userName);
           }
           catch(e){
               console.log(e)
           }
       }

    //    email()
    }, []);

           

    const handleLogout = () => {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('userEmail');
        AsyncStorage.removeItem('userName');
        AsyncStorage.removeItem('Cohorte');
        navigation.navigate('Home');
    }

    // if(error) {
    //     navigation.navigate('Home')
    // } else if (loading) {
    //     return <View><Text>Loading</Text></View>
    // } else {
        return (
            <View style={styles.todo}>
                <Image
                source={require("../assets/FondoAmarillo.png")}
                style={{width: '100%', position: 'absolute', height: '60%'}}
                ></Image>
            
                <View style={styles.container}>
                    <Text style={styles.title} sx={{fontSize: [30, 50]}}>{'Bienvenido '+ '!'}</Text>

                    <View style={styles.boton} sx={{width: [300, 600], height: [130, 200]}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileData: data })}>
                            <Image
                            source={require("../assets/materialEstudio2.jpg")}
                            style={styles.tarjeta} sx={{width: [300, 600], height:[130, 200]}}
                            >
                            </Image>
                            <View style={{width: '100%', justifyContent: 'center'}} sx={{height: [130, 200]}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', color: 'white'}}>
                                    Perfil
                                </Text>
                            </View>    
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boton} sx={{width: [300, 600], height: [130, 200]}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Mesas')}>
                            <Image
                            source={require("../assets/PairPrograming.jpg")}
                            style={styles.tarjeta} sx={{width: [300, 600], height:[130, 200]}}
                            >
                            </Image>
                            <View style={{width: '100%', justifyContent: 'center'}} sx={{height: [130, 200]}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', color: 'white'}}>
                                    Pair Programing
                                </Text>
                            </View>    
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boton} sx={{width: [300, 600], height: [130, 200]}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Mesas')}>
                            <Image
                            source={require("../assets/standUp.jpg")}
                            style={styles.tarjeta} sx={{width: [300, 600], height:[130, 200]}}
                            >
                            </Image>
                            <View style={{width: '100%',justifyContent: 'center'}} sx={{height: [130, 200]}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', color: 'white'}}>
                                    Stand Up
                                </Text>
                            </View>    
                        </TouchableOpacity>
                    </View>
                    <View style={{alignSelf: 'center'}}>
                        <TouchableOpacity style={styles.botonCerrar}onPress={handleLogout}>
                            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    // }
}


/*
const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(previousState => !previousState);

<Switch
    trackColor={{ false: "#767577", true: "#81b0ff" }}
    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
    ios_backgroundColor="#3e3e3e"
    onValueChange={toggleSwitch}
    value={isEnabled}
/>
*/
