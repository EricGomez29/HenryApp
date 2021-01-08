import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { styles } from '../styles/ProfileEditStyles';
import { gql, useMutation, useQuery } from '@apollo/client';
import Particles from './Particles';
import MenuDesplegable from './MenuDesplegable';
import {GET_USER} from '../apollo/user';


const IS_ADMIN = gql`
mutation editUser($username: String, $isAdmin: Boolean, $isPM:Boolean, $isInstructor: Boolean) {
    editUser (input: {
        username: $username
        isAdmin: $isAdmin
        isPM: $isPM
        isInstructor: $isInstructor
    }){
        username 
        isAdmin
        isPM
        isInstructor
    }
}`;

const ProfileUser = ({ route, navigation }) => {

    const email = localStorage.getItem('userEmail')
    const { loading, data: dataNew, error } = useQuery(GET_USER, {
    variables: {
        email: email
    }
    })
    const admin2 = dataNew && dataNew?.users[0]?.isAdmin;
    function Administrador() {
    if(admin2 === true){
        return (
            <View style={styles.boxBoton}>
                <View style={styles.containerBoton}>
                    <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{!admin ? "Hacerlo Administrador" : "Deshacer Administrador"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBoton}>
                    <TouchableOpacity style={styles.boton}  onPress={handleSubmit1} >
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{!ispm ? "Hacerlo PM" : "Deshacer PM"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBoton}>
                    <TouchableOpacity style={styles.boton}  onPress={handleSubmit2} >
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{!isinstructor ? "Hacerlo Instructor" : "Deshacer Instructor"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    }

    const [data, setData] = useState(route.params.data);
    const [admin, setAdmin] = useState(data.isAdmin);          
    const [ispm, setPM] = useState(data.isPM)                
    const [isinstructor, setInstructor] = useState(data.isInstructor)
    
    const [isAdmin] = useMutation(IS_ADMIN);                //hago la mutacion solo con isAmin
       
    const handleSubmit = async () => {
        var response = await isAdmin({
            variables: {
                username: data.username,
                isAdmin: !admin
            }
        })
        setAdmin(response.data.editUser.isAdmin)                                            //lo seteo en el estado para que cambie al instante el input
    }
    const handleSubmit1 = async () => {
        var response = await isAdmin({
            variables: {
                username: data.username,
                isPM: !ispm
            }
        })  
        setPM(response.data.editUser.isPM)                                       
    }

    const handleSubmit2 = async () => {
        var response = await isAdmin({
            variables: {
                username: data.username,
                isInstructor: !isinstructor
            }
        })
        setInstructor(response.data.editUser.isInstructor)                                       
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{width: 50, zIndex: 5}}>
                <MenuDesplegable navigation={navigation} />
            </View>
            <View style={{width: '100%', height: "98%", position: 'absolute', zIndex: -1}}>
                <Particles />
            </View>  
            <View style={styles.userInfoSection}>
                <Formik
                    initialValues={{
                        country: data.nationality,
                        standUp: data.standUp,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        username: data.username,
                        email: data.email,
                        nationality: data.nationality ,
                        phone: data.phone ,
                        cohorte: data.cohorte ,
                        nroTelefono: data.phone ,
                        image: data.image || `https://cdn.theorg.com/d3119e0e-8202-4034-85ce-d0356382515e_thumb.jpg`,
                        isAdmin: data.isAdmin,
                        isPM: data.isPM,
                        listPM: data.listPM

                    }}
>
                    {({ handleChange, handleBlur, values }) => (
                        <View style={styles.form}>
                            
                            <Avatar.Image
                                size={200}
                                source={values.image}
                            />
                            
                            <Text style={styles.textLabel}>Pais</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Argentina"
                                onChangeText={handleChange('nationality')}
                                onBlur={handleBlur('nationality')}
                                value={values.nationality}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Nombre</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nombre"
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                                editable={false}

                            />
                            <Text style={styles.textLabel}>Apellido</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Apellido"
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Usuario</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nombre de Usuario"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Email</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Cohorte</Text>
                            
                            <TextInput
                                style={styles.textInput}
                                placeholder="Cohorte"
                                onChangeText={handleChange('cohorte')}
                                onBlur={handleBlur('cohorte')}
                                value={values.cohorte}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Telefono</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Telefono - Opcional"
                                
                                value={values.phone}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Grupo de Stand-Up</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="No definido"
                                value={values.standUp}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Es Administrador</Text>
                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Cohorte"
                                    onChangeText={handleChange('isAdmin')}
                                    onBlur={handleBlur('isAdmin')}
                                    value={admin ? "SI" : "NO"}
                                    editable={false}
                                />

                            </View>
                            <Text style={styles.textLabel}>Es PM</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Es PM"
                                
                                value={ispm ? "SI" : "NO"}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Es Instructor</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Es PM"
                                
                                value={isinstructor ? "SI" : "NO"}
                                editable={false}
                            />
                            {Administrador()}
                            
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

export default ProfileUser;