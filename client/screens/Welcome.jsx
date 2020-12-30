import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Image, View, Text } from 'dripsy';
import { GET_USER } from '../apollo/user';
import { useQuery } from '@apollo/client';
import { styles } from '../styles/WelcomeStyle';

export default function Welcome({ navigation }) {
    const email = localStorage.getItem('userEmail');
    const { loading, data, error } = useQuery(GET_USER, {
        variables: {
            email,
        }
    });

    const cohorte = data?.users[0].cohorte
    const userName = data?.users[0].username;
    // console.log(data?.users[0].username)
    const cohorteStorage = localStorage.setItem('Cohorte', cohorte)
    const userNameStorage = localStorage.setItem('userName', userName)

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('Cohorte');
        navigation.navigate('Home');
    }

    if (error) {
        handleLogout();
    } else if (loading) {
        return <View><Text>Loading</Text></View>
    } else {
        return (
            <View style={styles.todo}>
                <Image
                    source={require("../assets/FondoAmarillo.png")}
                    style={{ width: '100%', position: 'absolute', height: '60%' }}
                ></Image>

                <View style={styles.container}>
                    <Text style={styles.title} sx={{ fontSize: [30, 50] }}>{'Bienvenido ' + data?.users[0].firstName + '!'}</Text>

                    <View style={styles.boton} sx={{ width: [300, 600], height: [130, 200] }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileData: data })}>
                            <Image
                                source={require("../assets/materialEstudio2.jpg")}
                                style={styles.tarjeta} sx={{ width: [300, 600], height: [130, 200] }}
                            >
                            </Image>
                            <View style={{ width: '100%', justifyContent: 'center' }} sx={{ height: [130, 200] }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', color: 'white' }}>
                                    Perfil
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boton} sx={{ width: [300, 600], height: [130, 200] }}>
                        <TouchableOpacity onPress={() => navigation.navigate('PairProgramming')}>
                            <Image
                                source={require("../assets/PairPrograming.jpg")}
                                style={styles.tarjeta} sx={{ width: [300, 600], height: [130, 200] }}
                            >
                            </Image>
                            <View style={{ width: '100%', justifyContent: 'center' }} sx={{ height: [130, 200] }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', color: 'white' }}>
                                    Pair Programing
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.boton} sx={{ width: [300, 600], height: [130, 200] }}>
                        <TouchableOpacity onPress={() => navigation.navigate('StandUp')}>
                            <Image
                                source={require("../assets/standUp.jpg")}
                                style={styles.tarjeta} sx={{ width: [300, 600], height: [130, 200] }}
                            >
                            </Image>
                            <View style={{ width: '100%', justifyContent: 'center' }} sx={{ height: [130, 200] }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', color: 'white' }}>
                                    Stand Up
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <TouchableOpacity style={styles.botonCerrar} onPress={handleLogout}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
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
