import React from 'react';
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup'
// UserQueries
import { USER_REGISTER } from '../Querys/userQuery.js';
import {useMutation} from '@apollo/client';

export default function Register({navigation}) {

    const validations = yup.object().shape({
        username: yup.string()
            .min(3, 'Demasiado corta, intentá con un nombre mas largo')
            .max(20, 'Demasiado larga, intentá con un nombre mas corto')
            .required('Este campo es obligatorio, por favor decime tu usuario'),
        firstName: yup.string()
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
            .min(8, ({min}) => `La contraseña debe tener al menos ${min} caracteres`)
            .required('este campo es obligatorio, por favor pone tu contraseña'),
        repeatPassword: yup.string()
            .min(8, ({min}) => `La contraseña de confirmacion debe tener al menos ${min} caracteres`)
            .required('este campo es obligatorio, por favor pone la confirmacion de tu contraseña')
    })

    const [register] = useMutation(USER_REGISTER);

    return (
        <>
            <View style={styles.rect}>
                <Image
                    source={require("../assets/logoHenry.png")}
                    resizeMode="contain"
                    style={styles.henry}
                ></Image>
            </View>
            <View style={styles.rect2}>
                <Text style={styles.title}>REGISTRO</Text>
                <Formik
                    initialValues={{username: '', email: '', firstName: '', lastName: '', cohorte: '', password: '', repeatPassword: ''}}
                    onSubmit={(values, {resetForm}) => {
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
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (
                        <View style={styles.form}>
                            {/* CAMPO USERNAME */}
                            <Text style={{marginTop: 15}}>Usuario</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                            {/* ERROR USERNAME */}
                            {touched.username && errors.username &&
                                <Text style={{fontSize: 12, color: '#FF0D10'}}>{errors.username}</Text>}

                            {/* CAMPO EMAIL */}
                            <Text style={{marginTop: 15}}>Email</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />

                            {/* ERROR EMAIL */}
                            {touched.email && errors.email &&
                                <Text style={{fontSize: 12, color: '#FF0D10'}}>{errors.email}</Text>}

                            {/* CAMPO FIRST NAME */}
                            <Text style={{marginTop: 15}}>Nombre</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                            />
                            {/* ERROR FIRSTNAME */}
                            {touched.firstName && errors.firstName &&
                                <Text style={{fontSize: 12, color: '#FF0D10'}}>{errors.firstName}</Text>}

                            {/* CAMPO LAST NAME */}
                            <Text style={{marginTop: 15}}>Apellido</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                            />
                            {/* ERROR LAST NAME */}
                            {touched.lastName && errors.lastName &&
                                <Text style={{fontSize: 12, color: '#FF0D10'}}>{errors.lastName}</Text>}

                            {/* CAMPO  COHORTE */}
                            <Text style={{marginTop: 15}}>Cohorte</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('cohorte')}
                                onBlur={handleBlur('cohorte')}
                                value={values.cohorte}
                            />
                            {/* ERROR COHORTE */}
                            {touched.cohorte && errors.cohorte &&
                                <Text style={{fontSize: 12, color: '#FF0D10'}}>{errors.cohorte}</Text>}

                            {/* CAMPO PASSWORD */}
                            <Text style={{marginTop: 15}}>Contraseña</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />

                            {/* ERROR PASSWORD */}
                            {touched.password && errors.password &&
                                <Text style={{fontSize: 12, color: '#FF0D10'}}>{errors.password}</Text>}

                            {/* CAMPO REPEAT PASSWORD */}
                            <Text style={{marginTop: 15}}>Repite la Contraseña</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={handleChange('repeatPassword')}
                                onBlur={handleBlur('repeatPassword')}
                                value={values.repeatPassword}
                            />

                            {/* ERROR REPEAT PASSWORD */}
                            {touched.repeatPassword && errors.repeatPassword &&
                                <Text style={{fontSize: 12, color: '#FF0D10'}}>{errors.repeatPassword}</Text>}

                            {/* REGISTRARSE */}
                            <TouchableOpacity style={styles.boton} disabled={!isValid} onPress={handleSubmit}>
                                <Text style={{fontWeight: 'bold'}}>Registrarme</Text>
                            </TouchableOpacity>

                            {/* INICIAR SESIÓN */}
                            <TouchableOpacity style={{marginTop: 15}} onPress={() => navigation.navigate('Login')}>
                                <Text style={{fontWeight: 'bold'}}>Ya tenes cuenta? Inicia Sesion</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </>
    )
}


//estilos

const styles = StyleSheet.create({
    rect: {
        top: 0,
        left: 0,
        width: "100%",
        height: 150,
        backgroundColor: "rgba(255,255,1,1)",
        overflow: "visible",
        alignItems: 'center',
        justifyContent: 'center',
    },
    rect2: {
        flex: 1,
        backgroundColor: "white",
        zIndex: -1,
    },
    henry: {
        marginTop: 130,
        width: 200,
        height: 200,
        zIndex: 1,
    },
    title: {
        marginTop: 80,
        marginBottom: -30,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center"
    },
    form: {
        marginTop: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'yellow',
        height: 30,
        width: '70%',
        marginTop: 5,
        justifyContent: "center"
    },
    boton: {
        backgroundColor: 'yellow',
        borderRadius: 15,
        height: 30,
        width: '70%',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 0
    },

});

