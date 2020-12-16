import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { View, TouchableOpacity, StyleSheet} from 'react-native';
// import {Button} from 'native-base'
import { styles } from '../styles/HomeStyle'
import Footer from '../Components/Footer'
import {Text, Image} from 'dripsy';


export default function Home({navigation}){
    console.log('estoy en el home')
    return (
        <View style={{display: 'flex', width: '100%', height: '100%', backgroundColor: 'white'}}>
            <Image
                source={require("../assets/FondoAmarillo.png")}
                style={{width: '100%', position: 'absolute', height: '60%'}}
                // sx={{height: [300, 500]}}
            ></Image>
            <View style={styles.container}>
                <Image
                    source={require("../assets/henry.png")}
                    resizeMode="contain"
                    style={styles.homeHenry}
                ></Image>
                <Text style={styles.homeApp}>
                        A P P
                </Text>
                <View>
                    <TouchableOpacity style={styles.homeBoton} onPress={() => {navigation.navigate('PruebaBoton')}}>
                        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>Comenzar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View>
              <Footer/>  
            </View> */}
        </View>
    )
}
