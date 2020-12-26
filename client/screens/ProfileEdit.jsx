import React, { useState } from 'react'
import { Formik } from 'formik';
import { View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { styles } from '../styles/ProfileEditStyles';
import { EDIT_USER } from '../Querys/userQuery';
import { useMutation } from '@apollo/client';

const ProfileEdit = ({ route, navigation }) => {

    const [data, setData] = useState(route.params.modifyData);
    const [editProfile] = useMutation(EDIT_USER);

    const handleSubmit = async (values) => {
        const response = await editProfile({
            variables: {
                username: values.username,
                lastName: values.lastName,
                firstName: values.firstName,
                email: values.email,
                cohorte: parseInt(values.cohorte)
            }
        })
        setData(response.data.editUser);
        navigation.navigate('Profile', {
            profileData: {
                users: [response.data.editUser],
            }
        })

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <Formik
                    initialValues={{
                        country: '',
                        firstName: data.firstName,
                        lastName: data.lastName,
                        username: data.username,
                        email: data.email,
                        cohorte: data.cohorte.number,
                        nroTelefono: 'no definido',
                        image: data.image || 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
                    }}
                    onSubmit={values => handleSubmit(values)}
                    navigation = {navigation}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, navigation }) => (
                        <View style={styles.form}>
                            
                                <Avatar.Image
                                    size={200}
                                    source={values.image}
                                    onPress={() => navigation.navigate('PhotoProfile',{ data: values})}
                               
                                />

                            <Text style={styles.textLabel}>Pais</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Argentina"
                                onChangeText={handleChange('country')}
                                onBlur={handleBlur('country')}
                                value={values.country}
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
                            <Text style={styles.textLabel}>Usuario</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nombre de Usuario"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                            <Text style={styles.textLabel}>Email</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <Text style={styles.textLabel}>Cohorte</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Cohorte"
                                onChangeText={handleChange('cohorte')}
                                onBlur={handleBlur('cohorte')}
                                value={values.cohorte}
                            />
                            <Text style={styles.textLabel}>Telefono</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Telefono - Opcional"
                                onChangeText={handleChange('nroTelefono')}
                                onBlur={handleBlur('nroTelefono')}
                                value={values.nroTelefono}
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