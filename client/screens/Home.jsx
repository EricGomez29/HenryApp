import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { yellow, black, white }  from '../styles/globalsVariables';
import Footer from '../Components/Footer'


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
            <View style={styles.rect}></View>
            <Image
                source={require("../assets/cohete.svg")}
                resizeMode="contain"
                style={styles.cohete}
            ></Image>
            <Image
                source={require("../assets/henry.png")}
                resizeMode="contain"
                style={styles.henry}
            ></Image>
            <Text style={styles.app}>
                    APP
            </Text>
        
            <TouchableOpacity style={styles.boton} onPress={() => {
                navigation.navigate('Login')
                console.log(data)} }
                >
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    COMENZAR
                </Text>
            </TouchableOpacity>
            <View>
              <Footer/>  
            </View>
            
        </View>
    )
}

// Estilos

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: white,
        color: black,
        maxWidth: 650,
    },
    rect: {
        top: 0,
        left: 0,
        width: "100%",
        height: 150,
        position: "absolute",
        backgroundColor: "rgba(255,255,1,1)",
        overflow: "visible"
      },
    cohete: {
        top: -60,
        marginTop: 0,
        marginBottom: 0,
        width: 250,
        height: 250
    },
    henry: {
        top: -100,
        width: 250,
        height: 200,
        marginTop: 30,
        marginBottom: 0,
        alignSelf: "center"
      },
    app: {
        marginTop: -170,
        fontSize: 40,
        fontWeight: "bold",
        color: yellow
    },
    boton: {
        marginTop: 80,
        width: 250,
        height: 60,
        backgroundColor: '#FFFF01',
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
  });
