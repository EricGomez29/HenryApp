import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Profile = ({ navigation }) => {

    const handleOnEdit = () => {
        navigation.navigate('ProfileEdit');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={styles.userNavigation}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>Atras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOnEdit}>
                        <Icon name="account-edit" color='#3b3b3b' size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        size={80}
                        source={require('../assets/logoHenry.png')}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>Fulanito Tal</Title>
                        <Caption style={styles.caption}>@fulano</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#3b3b3b" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Argentina</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#3b3b3b" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>+54 XXXXX-XXXX</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#3b3b3b" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>mi@gmail.com</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export const ProfileEdit = ({ navigation }) => {
    const validations = yup.object().shape({
        username: yup.string()
            .min(3, 'Demasiado corta, intentá con un nombre mas largo')
            .max(20, 'Demasiado larga, intentá con un nombre mas corto')
            .required('Este campo es obligatorio, por favor decime tu usuario'),
        email: yup.string()
            .min(3, 'Demasiado corta, intentá con un nombre mas largo')
            .max(20, 'Demasiado larga, intentá con un nombre mas corto')
            .required('Este campo es obligatorio, por favor decime tu nombre'),
        lastName: yup.string()
            .min(3, 'Demasiado corta, intentá con un nombre mas largo')
            .max(20, 'Demasiado larga, intentá con un nombre mas corto')
            .required('Este campo es obligatorio, por favor decime tu apellido'),
        email: yup.string()
            .email('El Email tiene que ser un Email valido')
            .required('este campo es obligatorio, por favor decime tu email'),
        password: yup.string()
            .min(8, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
            .required('este campo es obligatorio, por favor pone tu contraseña'),
        repeatPassword: yup.string()
            .min(8, ({ min }) => `La contraseña de confirmacion debe tener al menos ${min} caracteres`)
            .required('este campo es obligatorio, por favor pone la confirmacion de tu contraseña')
    })

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn}>
                    <Text>Atras</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.userInfoSection}>
                <Formik
                    initialValues={{ username: '', email: '', firstName: '', lastName: '', cohorte: '', password: '', repeatPassword: '' }}
                    onSubmit={(values, { resetForm }) => {
                        register({
                            variables: {
                                username: values.username,
                                firstName: values.firstName,
                                lastName: values.lastName,
                                cohorte: Number(values.cohorte),
                                email: values.email,
                                password: values.password,
                            }
                        })
                        resetForm()
                    }}

                    validationSchema={validations}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                        <View style={styles.form}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Argentina"
                                onChangeText={handleChange('country')}
                                onBlur={handleBlur('country')}
                                value={values.country}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Irene"
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Tijerina"
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="@Tijerina"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="tijerina123@gmail.com"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Cohorte 6"
                                onChangeText={handleChange('cohorte')}
                                onBlur={handleBlur('cohorte')}
                                value={values.cohorte}
                            />
                            <TextInput
                                style={styles.textInput}
                                placeholder="Telefono - Opcional"
                                onChangeText={handleChange('nroTelefono')}
                                onBlur={handleBlur('nroTelefono')}
                                value={values.nroTelefono}
                            />
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

export const ProfilePhoto = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View>
                <Text>mi foto</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    btn: {
        backgroundColor: '#FFFF01',
        color: '#fff',
        padding: 10,
    },
    userNavigation: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    form: {
        marginTop: 20,
    },
    textInput: {
        border: '1px solid #BBD2C5',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
});