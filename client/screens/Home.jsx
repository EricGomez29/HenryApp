import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { Container } from '../styles/Container'

export default function Home({navigation}){
    return (
        <Container>
            <View style={styles.rect}></View>
            <Image
                source={require("../assets/cohete.png")}
                resizeMode="contain"
                style={styles.cohete}
            ></Image>
            <Image
                source={require("../assets/henry.png")}
                resizeMode="contain"
                style={styles.henry}
            ></Image>
        
            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Login')} >
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    COMENZAR
                </Text>
            </TouchableOpacity>
        </Container>
    )
}

// Estilos

const styles = StyleSheet.create({
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
        top: -50,
        marginTop: 0,
        marginBottom: 0,
        width: 200,
        height: 150
    },
    henry: {
        top: -30,
        width: 250,
        height: 200,
        marginBottom: 0,
        alignSelf: "center"
      },
      boton: {
        top: -30,
        width: 250,
        height: 60,
        backgroundColor: '#FFFF01',
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
  });