import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Button, Text} from 'native-base'
import { styles } from '../styles/HomeStyle'
import Footer from '../Components/Footer'


export default function Home({navigation}){
    
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
                <Button style={styles.homeBoton} onPress={() => {
                    navigation.navigate('PruebaBoton')}}>
                    <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>Comenzar</Text>
                </Button>
            </View>
            {/* <View>
              <Footer/>  
            </View> */}
        </View>
    )
}
