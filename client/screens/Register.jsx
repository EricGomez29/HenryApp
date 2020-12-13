import React from 'react';
import { Text, View, Button, TextInput, TouchableOpacity, Image} from 'react-native';
import {Formik, yupToFormErrors} from 'formik';
import * as yup from 'yup'
import { USER_REGISTER } from '../Querys/userQuery.js';
import {useMutation} from '@apollo/client';
import { styles } from '../styles/styles'

export default function Register({navigation}) {

    const validations = yup.object().shape({
        username: yup.string()
            .min(4, ( {min} ) => `Mínimo ${min} caracteres`)
            .max(20, ( {max} ) => `Máximo ${max} caracteres`)
            .required('Campo obligatorio'),
        firstName: yup.string()
            .max(20, ( {max} ) => `Máximo ${max} caracteres`)
            .required('Campo obligatorio'),
        lastName: yup.string()
            .max(20, ( {max} ) => `Máximo ${max} caracteres`)
            .required('Campo obligatorio'),
        cohorte: yup.string()
            .required('Campo obligatorio'),
        email: yup.string()
            .email('Email no válido')
            .required('Campo obligatorio'),
        password: yup.string()
            .min(8, ( {min} ) => `La contraseña debe tener al menos ${min} caracteres`)
            .required('Campo obligatorio'),
        repeatPassword: yup.string()
            .required('Campo obligatorio')
    })

    const [register] = useMutation(USER_REGISTER);

    const handleRegister = (values, {resetForm}) => {
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
    }

    return (
        <>
            <View style={styles.header}>
                <Image
                    source={require("../assets/logoHenry.png")}
                    resizeMode="contain"
                    style={styles.imgHenry}
                ></Image>
            </View>
            <View style={styles.body}>
                <Formik
                    initialValues={{username: '', email: '', firstName: '', lastName: '', cohorte: '', password: '', repeatPassword: ''}}
                    onSubmit={handleRegister}
                    validationSchema={validations}
                >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (
                        <View style={styles.form}>
                             <Text style={styles.h1}>REGISTRO</Text>

                            {/* CAMPO USERNAME */}
                            <Text style={styles.label}>Usuario</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}     />
                            {/* ERROR USERNAME */}
                            {touched.username && errors.username &&
                            <Text style={styles.errorForm}>{errors.username}</Text>}

                            {/* CAMPO EMAIL */}
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}     />
                            {/* ERROR EMAIL */}
                            {touched.email && errors.email &&
                            <Text style={styles.errorForm}>{errors.email}</Text>}

                            {/* CAMPO FIRST NAME */}
                            <Text style={styles.label}>Nombre</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}      />
                            {/* ERROR FIRSTNAME */}
                            {touched.firstName && errors.firstName &&
                            <Text style={styles.errorForm}>{errors.firstName}</Text>}

                            {/* CAMPO LAST NAME */}
                            <Text style={styles.label}>Apellido</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}      />
                            {/* ERROR LAST NAME */}
                            {touched.lastName && errors.lastName &&
                            <Text style={styles.errorForm}>{errors.lastName}</Text>}

                            {/* CAMPO  COHORTE */}
                            <Text style={styles.label}>Cohorte</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('cohorte')}
                                onBlur={handleBlur('cohorte')}
                                value={values.cohorte}      />
                            {/* ERROR COHORTE */}
                            {touched.cohorte && errors.cohorte &&
                            <Text style={styles.errorForm}>{errors.cohorte}</Text>}

                            {/* CAMPO PASSWORD */}
                            <Text style={styles.label}>Contraseña</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}      />
                            {/* ERROR PASSWORD */}
                            {touched.password && errors.password &&
                            <Text style={styles.errorForm}>{errors.password}</Text>}

                            {/* CAMPO REPEAT PASSWORD */}
                            <Text style={styles.label}>Repite la Contraseña</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={handleChange('repeatPassword')}
                                onBlur={handleBlur('repeatPassword')}
                                value={values.repeatPassword}     />
                            {/* ERROR REPEAT PASSWORD */}
                            {touched.repeatPassword && errors.repeatPassword &&
                            <Text style={styles.errorForm}>{errors.repeatPassword}</Text>}

                            {/* REGISTRARSE */}
                            <TouchableOpacity style={styles.boton} disabled={!isValid} onPress={handleSubmit}>
                                <Text style={ {fontWeight: "bold" } }>Registrarme</Text>
                            </TouchableOpacity>

                            {/* INICIAR SESIÓN */}
                            <TouchableOpacity style={styles.label} onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.linkForm}>Ya tenes cuenta? Inicia Sesion</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                </Formik>
            </View>
        </>
    )
}

