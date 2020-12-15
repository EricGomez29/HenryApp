import React from 'react';
import { View, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text} from 'native-base';
import {Formik, yupToFormErrors} from 'formik';
import * as yup from 'yup'
import { USER_REGISTER } from '../Querys/userQuery.js';
import {useMutation} from '@apollo/client';
import { styles } from '../styles/RegisterStyle'

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
        <View style={{flex: 1}}>
            
            <View style={{width: 270, height: 350}}>

                <Formik
                    initialValues={{username: '', email: '', firstName: '', lastName: '', cohorte: '', password: '', repeatPassword: ''}}
                    onSubmit={handleRegister}
                    validationSchema={validations}
                >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (
                        <View style={{width: '90%', height: 320}}>

                            <ScrollView style={{width: '90%', height: 300}}>
                                <View >
                                    <Item floatingLabel>
                                        <Label>Usuario</Label>
                                        <Input 
                                            onChangeText={handleChange('username')}
                                            onBlur={handleBlur('username')}
                                            value={values.username}/>
                                    </Item>
                                </View>
                                {/* ERROR USERNAME */}
                                {touched.username && errors.username &&
                                <Text style={styles.errorForm}>{errors.username}</Text>}

                                {/* CAMPO EMAIL */}
                                <View style={{marginTop: 10}}>
                                    <Item floatingLabel>
                                        <Label>Email</Label>
                                        <Input 
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}/>
                                    </Item>
                                </View>
                                {/* ERROR EMAIL */}
                                {touched.email && errors.email &&
                                <Text style={styles.errorForm}>{errors.email}</Text>}

                                {/* CAMPO FIRST NAME */}
                                <View style={{marginTop: 10}}>
                                    <Item floatingLabel>
                                        <Label>Nombre</Label>
                                        <Input 
                                            onChangeText={handleChange('firstName')}
                                            onBlur={handleBlur('firstName')}
                                            value={values.firstName}/>
                                    </Item>
                                </View>
                                {/* ERROR FIRSTNAME */}
                                {touched.firstName && errors.firstName &&
                                <Text style={styles.errorForm}>{errors.firstName}</Text>}

                                {/* CAMPO LAST NAME */}
                                <View style={{marginTop: 10}}>
                                    <Item floatingLabel>
                                        <Label>Apellido</Label>
                                        <Input 
                                            onChangeText={handleChange('lastName')}
                                            onBlur={handleBlur('lastName')}
                                            value={values.lastName}/>
                                    </Item>
                                </View>
                                {/* ERROR LAST NAME */}
                                {touched.lastName && errors.lastName &&
                                <Text style={styles.errorForm}>{errors.lastName}</Text>}

                                {/* CAMPO  COHORTE */}
                                <View style={{marginTop: 10}}>
                                    <Item floatingLabel>
                                        <Label>Cohorte</Label>
                                        <Input 
                                        onChangeText={handleChange('cohorte')}
                                        onBlur={handleBlur('cohorte')}
                                        value={values.cohorte}/>
                                    </Item>
                                </View>
                                {/* ERROR COHORTE */}
                                {touched.cohorte && errors.cohorte &&
                                <Text style={styles.errorForm}>{errors.cohorte}</Text>}

                                {/* CAMPO PASSWORD */}
                                <View style={{marginTop: 10}}>
                                    <Item floatingLabel>
                                        <Label>Contraseña</Label>
                                        <Input 
                                        secureTextEntry={true}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}/>
                                    </Item>
                                </View>
                                {/* ERROR PASSWORD */}
                                {touched.password && errors.password &&
                                <Text style={styles.errorForm}>{errors.password}</Text>}

                                {/* CAMPO REPEAT PASSWORD */}
                                <View style={{marginTop: 10}}>
                                    <Item floatingLabel>
                                        <Label>Repite la contraseña</Label>
                                        <Input 
                                        secureTextEntry={true}
                                        onChangeText={handleChange('repeatPassword')}
                                        onBlur={handleBlur('repeatPassword')}
                                        value={values.repeatPassword}/>
                                    </Item>
                                </View>
                                {/* ERROR REPEAT PASSWORD */}
                                {touched.repeatPassword && errors.repeatPassword &&
                                <Text style={styles.errorForm}>{errors.repeatPassword}</Text>}
                            </ScrollView>

                            {/* REGISTRARSE */}
                            <View style={styles.containerBoton}>
                                <Button style={styles.boton} disabled={!isValid} onPress={handleSubmit}>
                                    <Text style={{color: 'black', fontWeight: 'bold'}}>Registrarme</Text>
                                </Button>
                            </View>

                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}

