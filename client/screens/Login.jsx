import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'
import { useMutation } from '@apollo/client';
import { styles } from '../styles/LoginStyle'
import {LOGIN} from '../Querys/userQuery'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {

    const validations = yup.object().shape({
        email: yup.string()
            .required('Campo obligatorio'),
        password: yup.string()
            .min(8, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
            .required('Campo obligatorio')
    })

    const [login] = useMutation(LOGIN);

    const handleSubmit = async (values) => {
        const response = await login({
            variables: {
                email: values.email,
                password: values.password
            }
        });
        const { errors, success, token } = response.data.login;
        if (success) {
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userEmail', values.email);
            navigation.navigate('Welcome');
        } else {
            console.error(errors);
        }
    }

    return (
        <View style={{ flex: 1 }}>

            <View style={{ width: 270 }}>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => handleSubmit(values)}
                    validationSchema={validations}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={{ width: '90%' }}>
                            <View style={styles.containerBoton}>
                                <View >
                                    <TextInput
                                        placeholder='Email'
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        style={styles.input} />
                                </View>
                                {/* ERROR EMAIL */}
                                {touched.username && errors.email &&
                                    <Text style={styles.errorForm}>{errors.email}</Text>}

                                <View style={{ marginTop: 10 }}>
                                    <TextInput
                                        placeholder='Contraseña'
                                        secureTextEntry={true}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        style={styles.input} />
                                </View>
                                {/* ERROR CONTRASEÑA */}
                                {touched.password && errors.password &&
                                    <Text style={styles.errorForm}>{errors.password}</Text>}
                            </View>

                            <View style={styles.containerBoton}>
                                <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword') }} style={styles.olvideContraseña}>
                                    <Text style={{ color: 'black' }}>Olvide mi contraseña</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerBoton}>
                                <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>INICIAR SESION</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerBoton}>
                                <TouchableOpacity style={styles.olvideContraseña}>
                                    <Text style={{ color: 'black' }}>Tambien podes ingresar con:</Text>
                                </TouchableOpacity>
                            </View>
                            {/* 
                        <View style={{flexDirection: 'row', justifyContent: "center", marginTop: 10}}>
                            <TouchableOpacity style={{ backgroundColor: '#3B5998', borderRadius: 100, width: 48, height: 48, marginRight: 10 }}>
                                <Icon name="logo-facebook" style={{fontSize:20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 100, width: 48, height: 48, marginLeft: 10 }}>
                                <Icon name="logo-google" style={{fontSize:20}}/>
                            </TouchableOpacity>
                        </View> */}
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}
