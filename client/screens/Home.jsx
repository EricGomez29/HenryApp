import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { styles } from '../styles/styles'


const USERS = gql`
    query Users {
        users {
            firstName
        }
}`;

export default function Home({navigation}){
    const { data } = useQuery(USERS)
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../assets/cohete.svg")}
                    resizeMode="contain"
                    style={styles.imgCohete}
                ></Image>
            </View>
            <View style={styles.form}>
                <Image
                    source={require("../assets/henry.png")}
                    resizeMode="contain"
                    style={styles.homeHenry}
                ></Image>
                <Text style={styles.homeApp}>
                        APP
                </Text>
            
                <TouchableOpacity style={styles.homeBoton} onPress={() => {
                    navigation.navigate('Login')
                    console.log(data)} }
                    >
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>
                        COMENZAR
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
