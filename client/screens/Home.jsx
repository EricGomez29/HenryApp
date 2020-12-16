import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text} from 'react-native';
// import {Button} from 'native-base'
import { styles } from '../styles/HomeStyle'
import Footer from '../Components/Footer'


export default function Home({navigation}){
    console.log('estoy en el home')
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/henry.png")}
                resizeMode="contain"
                style={styles.homeHenry}
            ></Image>
            <Text style={styles.homeApp}>
                    APP
            </Text>
            <View>
                <TouchableOpacity style={styles.homeBoton} onPress={() => {navigation.navigate('PruebaBoton')}}>
                    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>Comenzar</Text>
                </TouchableOpacity>
            </View>
            {/* <View>
              <Footer/>  
            </View> */}
        </View>
    )
}
