import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'
import { USER_REGISTER } from '../apollo/user'
import { useMutation } from '@apollo/client';
import { styles } from '../styles/RegisterStyle';

const CreateUserCohorte = ({ onClose }) => {

    const validations = yup.object().shape({
        username: yup.string()
            .min(4, ({ min }) => `Mínimo ${min} caracteres`)
            .max(20, ({ max }) => `Máximo ${max} caracteres`)
            .required('Campo obligatorio'),
        firstName: yup.string()
            .max(20, ({ max }) => `Máximo ${max} caracteres`)
            .required('Campo obligatorio'),
        lastName: yup.string()
            .max(20, ({ max }) => `Máximo ${max} caracteres`)
            .required('Campo obligatorio'),
        cohorte: yup.string()
            .required('Campo obligatorio'),
        email: yup.string()
            .email('Email no válido')
            .required('Campo obligatorio'),
        password: yup.string()
            .min(8, ({ min }) => `La contraseña debe tener al menos ${min} caracteres`)
            .required('Campo obligatorio'),
        repeatPassword: yup.string()
            .required('Campo obligatorio')
    })

    const [register] = useMutation(USER_REGISTER);
    const [done, setDone] = useState("")

    const handleRegister = (values, { resetForm }) => {
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
        setDone("Nuevo Usuario Registrado");
    }

    return (
        <View style={{ flex: 1, position: 'fixed', top: 0, backgroundColor: '#fff', width: '100%', zIndex: '999' }}>
            <View style={{ flex: 1, flexDirection: 'row-reverse', width: '90%', marginTop: '10px' }}>
                <TouchableOpacity style={{ backgroundColor: '#F2FF00', borderRadius: '50%', padding: '10px' }} onPress={onClose}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>x</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ fontSize: '20px', marginBottom: '2rem', marginTop: '1rem' }}>
                    Nuevo Alumno
                </Text>
            </View>
            <View>
                <Formik
                    initialValues={{ username: '', email: '', firstName: '', lastName: '', cohorte: '', password: '', repeatPassword: '' }}
                    onSubmit={handleRegister}
                    validationSchema={validations}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                        <View>
                            <ScrollView style={{ alignSelf: 'center' }}>
                                <View >
                                    <TextInput
                                        placeholder='Nombre de usuario'
                                        onChangeText={handleChange('username')}
                                        onBlur={handleBlur('username')}
                                        value={values.username}
                                        style={styles.input} />
                                </View>

                                {touched.username && errors.username &&
                                    <Text style={styles.errorForm}>{errors.username}</Text>}

                                <View style={{ marginTop: 10 }}>
                                    <TextInput
                                        placeholder='Email'
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        style={styles.input} />
                                </View>

                                {touched.email && errors.email &&
                                    <Text style={styles.errorForm}>{errors.email}</Text>}

                                <View style={{ marginTop: 10 }}>
                                    <TextInput
                                        placeholder='Nombre'
                                        onChangeText={handleChange('firstName')}
                                        onBlur={handleBlur('firstName')}
                                        value={values.firstName}
                                        style={styles.input} />
                                </View>

                                {touched.firstName && errors.firstName &&
                                    <Text style={styles.errorForm}>{errors.firstName}</Text>}

                                <View style={{ marginTop: 10 }}>
                                    <TextInput
                                        placeholder='Apellido'
                                        onChangeText={handleChange('lastName')}
                                        onBlur={handleBlur('lastName')}
                                        value={values.lastName}
                                        style={styles.input} />
                                </View>

                                {touched.lastName && errors.lastName &&
                                    <Text style={styles.errorForm}>{errors.lastName}</Text>}

                                <View style={{ marginTop: 10 }}>
                                    <TextInput
                                        placeholder='Cohorte'
                                        onChangeText={handleChange('cohorte')}
                                        onBlur={handleBlur('cohorte')}
                                        value={values.cohorte}
                                        style={styles.input} />
                                </View>

                                {touched.cohorte && errors.cohorte &&
                                    <Text style={styles.errorForm}>{errors.cohorte}</Text>}

                                <View style={{ marginTop: 10 }}>
                                    <TextInput
                                        placeholder='Contraseña'
                                        secureTextEntry={true}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        style={styles.input} />
                                </View>

                                {touched.password && errors.password &&
                                    <Text style={styles.errorForm}>{errors.password}</Text>}

                                <View style={{ marginTop: 10 }}>
                                    <TextInput
                                        placeholder='Repite la contraseña'
                                        secureTextEntry={true}
                                        onChangeText={handleChange('repeatPassword')}
                                        onBlur={handleBlur('repeatPassword')}
                                        value={values.repeatPassword}
                                        style={styles.input} />
                                </View>

                                {touched.repeatPassword && errors.repeatPassword &&
                                    <Text style={styles.errorForm}>{errors.repeatPassword}</Text>}
                            </ScrollView>

                            <View style={styles.containerBoton}>
                                <TouchableOpacity style={styles.boton} disabled={!isValid} onPress={handleSubmit}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Registrar</Text>
                                </TouchableOpacity>
                            </View>
                            <View stlye={{ alignItems: "center" }}>
                                <Text style={styles.success}>
                                    {done}
                                </Text>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}

export default CreateUserCohorte;