import React from 'react';
import { TextInput, Image, TouchableOpacity, StyleSheet, Animated, Easing, ScrollView, Text } from 'react-native';
import { styles } from '../styles/IniciarYregistrar';
import Iniciarr from './Login';
import Register from './Register';
import { View } from 'dripsy';
import Particles from './Particles';

export default function Botones({ navigation }) {
    const traslateAnimation = new Animated.Value(0)
    const fadeRegister = new Animated.Value(0)
    const fadeIniciar = new Animated.Value(1)
    const index = new Animated.Value(3)
    function Iniciar() {
        return (
            <Animated.View style={[{ width: 200, height: 200, position: "absolute" },
            { opacity: fadeIniciar, zIndex: index }]}>
                <Iniciarr navigation={navigation} />
            </Animated.View>
        )
    };

    function Registrarse() {
        return (
            <Animated.View style={[{ width: 250, height: 350 },
            { opacity: fadeRegister }]}>
                <Register />
            </Animated.View>
        )
    };

    function aparecer() {
        Animated.timing(fadeRegister, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true
        }).start()
        Animated.timing(fadeIniciar, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true
        }).start()
        Animated.timing(index, {
            toValue: -1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }
    function desaparecer() {
        Animated.timing(fadeRegister, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true
        }).start()
        Animated.timing(fadeIniciar, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true
        }).start()
        Animated.timing(index, {
            toValue: 3,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    function moverDerecha() {
        Animated.timing(traslateAnimation, {
            toValue: 125,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
        }).start()
        aparecer();
    }

    function moverIzquierda() {
        Animated.timing(traslateAnimation, {
            toValue: 0,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
        }).start()
        desaparecer();
    }

    return (
        <View style={styles.todo}>

            <View style={{width: '100%', height: '99%', position: 'absolute'}}>
                <Particles />
            </View>
            <View style={{zIndex: 10}} >
                <Image
                    source={require("../assets/logoHenry.png")}
                    style={{width: 130, height: 70, marginBottom: 10, alignSelf: "flex-start"}}
                />
            </View>

            <View style={styles.container} sx={{width: [300, 400]}} >
            
                <View style={styles.cuadro} sx={{width: [300, 400]}}>

                    <View style={styles.botones}>
                        <Animated.View
                            style={[{ height: 50, backgroundColor: 'yellow', zIndex: 2, position: "absolute", width: 125, borderRadius: 100 },
                            { transform: [{ translateX: traslateAnimation }] }]} />
                        <TouchableOpacity style={styles.boton} onPress={moverIzquierda}>
                            <Text style={{ fontWeight: 'bold', color: 'black' }}>Iniciar Sesion</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.boton} onPress={moverDerecha}>
                            <Text style={{ fontWeight: 'bold', color: 'black' }}>Registrarse</Text>
                        </TouchableOpacity >
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Iniciar />
                        <Registrarse />
                    </View>
                </View>
            </View>
        </View>
    )
}

