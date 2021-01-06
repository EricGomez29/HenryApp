import React, { useState } from 'react';
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
            .email("Email invalido")
            .required('Campo obligatorio'),
        password: yup.string()
            .min(8, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
            .required('Campo obligatorio')
    })

    const [login] = useMutation(LOGIN);
    const [error, setError] = useState("")
    const handleSubmit = async (values) => {
        const response = await login({
            variables: {
                email: values.email,
                password: values.password
            }
        });
        const { errors, success, token } = response.data.login;
        if (success) {
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', values.email);
            navigation.navigate('Welcome');
        } else {
            if(errors){
                setError(`${errors[0].message}`)
            }
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
                                <View style={styles.errorMessage}>
                                    {error}
                                </View>
                                <View >
                                    <TextInput
                                        placeholder='Email'
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        style={styles.input} />
                                </View>
                                {/* ERROR EMAIL */}
                                {errors.email &&
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
                                <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>INICIAR SESION</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.containerBoton}>
                                <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword') }} style={styles.olvideContraseña}>
                                    <Text style={{ color: 'black' }}>Olvide mi contraseña</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}
