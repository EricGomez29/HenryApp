import React, { useState } from 'react'
import { Formik } from 'formik';
import { View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { styles } from '../styles/ProfileEditStyles';
import { EDIT_USER } from '../apollo/user';
import { useMutation } from '@apollo/client';
import Particles from './Particles';

const ProfileEdit = ({ route, navigation }) => {

    const [data, setData] = useState(route.params.modifyData);
    const [editProfile] = useMutation(EDIT_USER);

    const handleSubmit = async (values) => {
        try {
            const response = await editProfile({
                variables: {
                    username: values.username,
                    lastName: values.lastName,
                    firstName: values.firstName,
                    email: values.email,
                    cohorte: parseInt(values.cohorte),
                    nationality: values.nationality,
                    phone: values.phone,
                }
            })
            setData(response.data.editUser);
            navigation.navigate('Profile', {
                profileData: {
                    users: [data],
                }
            })
        } catch (error) {
            console.log(error);    
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{width: '100%', height: '99%', position: 'absolute', zIndex: -1}}>
                <Particles />
            </View>
            <View style={styles.userInfoSection}>
                <Formik
                    initialValues={{
                        country: data.nationality || '',
                        firstName: data.firstName,
                        lastName: data.lastName,
                        username: data.username,
                        email: data.email,
                        nationality: data.nationality || '',
                        phone: data.phone || '',
                        cohorte: data.cohorte || '',
                        nroTelefono: data.phone || '',
                        image: data.image || `https://cdn.theorg.com/d3119e0e-8202-4034-85ce-d0356382515e_thumb.jpg`,
                    }}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.form}>
                            
                            <Avatar.Image
                                size={200}
                                source={values.image}
                            />
                            <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('PhotoProfile',{ data: values})}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Cambiar Imagen</Text>
                            </TouchableOpacity>
                            <Text style={styles.textLabel}>Pais</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Argentina"
                                onChangeText={handleChange('nationality')}
                                onBlur={handleBlur('nationality')}
                                value={values.nationality}
                            />
                            <Text style={styles.textLabel}>Nombre</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nombre"
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                            />
                            <Text style={styles.textLabel}>Apellido</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Apellido"
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                            />
                            {/* <Text style={styles.textLabel}>Usuario</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nombre de Usuario"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            /> */}
                            <Text style={styles.textLabel}>Email</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {/* <Text style={styles.textLabel}>Cohorte</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Cohorte"
                                onChangeText={handleChange('cohorte')}
                                onBlur={handleBlur('cohorte')}
                                value={values.cohorte}
                            /> */}
                            <Text style={styles.textLabel}>Telefono</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Telefono - Opcional"
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                            />
                            <View style={styles.containerBoton}>
                                <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Guardar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

export default ProfileEdit;