import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import  * as yup from 'yup'
import { gql, useMutation, useQuery } from '@apollo/client';
import { styles } from '../styles/styles'
import Footer from '../Components/Footer'

const LOGIN = gql`
    mutation Login($email: String!, $password: String! ) {
        login(email: $email, password: $password) {
            userId
            token
        }
}`;

export default function Login ({navigation}) {

    
    const validations= yup.object().shape({
        username: yup.string()
            .required('Campo obligatorio'),
        password: yup.string()
            .min( 8, ( { min } )  => `La contraseña debe tener al menos ${min} caracteres`)
            .required('Campo obligatorio')
    })
    
    const  [login, {data} ]= useMutation(LOGIN);

    const handleSubmit = (values) => {
        login( { variables: { email: values.username, password: values.password } } );
        if(error) {
            return console.log(error)
        } 
        navigation.navigate("Welcome")
       }

    console.log(data)
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
                initialValues={{ username: '', password: '' }}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldTouched }) => (
                <View style={styles.form}>
                    <Text style={styles.h1}>LOGIN</Text>
                    {/* CAMPO USUARIO */}
                    <Text style={styles.label}>Usuario</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                    />
                    {/* ERROR USUARIO */}
                    {touched.username && errors.username &&
                    <Text style={styles.errorForm}>{errors.username}</Text>}

                    {/* CAMPO CONTRASEÑA */}
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    /> 

                    {/* ERROR CONTRASEÑA */}
                    {touched.password && errors.password &&
                    <Text style={styles.errorForm}>{errors.password}</Text>}

                    {/* BOTON INGRESAR */}
                    <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                        <Text style={ {fontWeight: "bold" } } >INGRESAR</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.linkForm}>Registrarse</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.linkForm}>Recuperar contraseña</Text>
                    </TouchableOpacity> 
                        
                </View>
                )}
            </Formik>
        </View>
        <View>
          <Footer/>  
        </View>
        </>
    )
}
