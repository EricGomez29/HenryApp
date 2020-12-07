import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Switch, StyleSheet, Image } from 'react-native';
import { Container } from '../styles/Container'

export default function Welcome( { navigation } ){
    
    return (
        <Container>
            <View style={styles.rect}></View>
            <Image
                source={require("../assets/logoHenry.png")}
                resizeMode="contain"
                style={styles.henry}
            ></Image>

            <Text style={styles.title}>Bienvenido usuario</Text>
        
            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('#')} >
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    PERFIL
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('#')} >
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    MATERIAL DE ESTUDIO
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('#')} >
                <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    PAIR PROGRAMMING
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.action}>Cerrar sesión</Text>
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
    henry: {
        top: -65,
        width: 200,
        height: 200,
        marginBottom: 0,
        alignSelf: "center",
        zIndex: 1,
      },
    boton: {
        width: 250,
        height: 40,
        backgroundColor: '#FFFF01',
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    title: {
        marginTop: 0,
        marginBottom: 20,
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center"
    },
    action: {
        fontWeight: 'bold',
        marginTop: 20,
    }
});

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