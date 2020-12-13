import React from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet, Animated, Easing} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Tab, Tabs, TabHeading, Icon} from 'native-base';
// import styles from '../styles/LoginStyle'
import {styles} from '../styles/IniciarYregistrar'

export default function Botones(){
    const traslateAnimation = new Animated.Value(0)
    const fadeAnim = new Animated.Value(0)

    function Iniciar(){
        return(
            <View style={{width: 200, height: 200, backgroundColor: 'red', position: "absolute"}}>
                <Text>Holaaaa</Text>
            </View>
        )
    };
    
    function Registrarse(){
        return(
            <Animated.View style={[{width: 200, height: 200, backgroundColor: 'gray'},
                {opacity: fadeAnim}]}>
                <Text>chauuu</Text>
            </Animated.View>
        )
    };

    function aparecer(){
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
        }).start()
    }
    function desaparecer(){
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 600,
        }).start()
    }

    function moverDerecha(){
        Animated.timing(traslateAnimation, {
            toValue: 140,
            duration: 600,
            easing: Easing.inOut(Easing.ease)
        }).start()
        aparecer();
    }

    function moverIzquierda(){
        Animated.timing(traslateAnimation, {
            toValue: 0,
            duration: 600,
            easing: Easing.inOut(Easing.ease)
        }).start()
        desaparecer();
    }


    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
            <View style={styles.botones}>
                <Animated.View
                style={[{height: 50, backgroundColor: 'yellow', zIndex: 2, position: "absolute", width: 140, borderRadius: 100},
                {transform:[{translateX: traslateAnimation}]}]}/>
                <Button style={styles.boton} onPress={moverIzquierda}>
                    <Text style={{fontWeight: 'bold', color: 'black'}}>Iniciar Sesion</Text>
                </Button>
                
                <Button style={styles.boton} onPress={moverDerecha}>
                    <Text style={{ fontWeight: 'bold', color: 'black'}}>Registrarse</Text>
                </Button >

            </View>
            <View>
                <Iniciar/>
                <Registrarse/>
            </View>
            </View>
        </View>
    )
}



// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     botones:{
//         width: 280,
//         backgroundColor: 'white',
//         borderRadius: 100,
//         alignItems: "center",
//         justifyContent: "space-between",
//         flexDirection: 'row',
//         height:50,
//         zIndex: -1
//     },
//     boton:{
//         backgroundColor: 'transparent',
//         zIndex: 4,
//         width: 140,
//         justifyContent: "center"
//     }
// })