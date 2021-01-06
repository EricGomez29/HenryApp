import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import  * as yup from 'yup';
import { styles } from '../styles/styles';
import { FORGOT_PASSWORD_EMAIL } from '../apollo/user';
import { useMutation } from '@apollo/client';

export default function ForgotPassword ({navigation}) {

    const [forgotPasswordMail] =useMutation(FORGOT_PASSWORD_EMAIL)
    
    const validations= yup.object().shape({
        email: yup.string()
            .email('Email inválido')
            .required('Campo obligatorio'),
    })

    const  handleSubmit = async (values) => {
        try{
            const response = await forgotPasswordMail({
                variables: {
                    email: values.email
                }
            });
            navigation.navigate("CompareCode", {
                email: values.email
            })
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
        <View style={styles.header}>
            <Image
                source={require("../assets/logoHenry.png")}
                resizeMode="contain"
                style={styles.imgHenry}
                onPress={() => navigation.navigate('Home')}
            ></Image>
            
        </View>
        <View style={styles.body}>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={ values =>  handleSubmit(values) }
                validationSchema={validations}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldTouched }) => (
                <View style={styles.form}>
                    <Text style={styles.h1}>RECUPERAR CONTRASEÑA</Text>
                    <Text style={styles.h2}>Ingrese su email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    {touched.email && errors.email &&
                    <Text style={styles.error}>{errors.email}</Text>}                    
                
                    <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                        <Text style={styles.linkForm} >Confirmar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('PruebaBoton')}>
                        <Text style={styles.linkForm}>Volver</Text>
                    </TouchableOpacity>    
                </View>
                )}
            </Formik>
        </View>
        </>
    )
}