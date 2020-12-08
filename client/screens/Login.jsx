import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import  * as yup from 'yup'
import { Container } from '../styles/Container'
import { gql, useMutation, useQuery } from '@apollo/client';
import { ValuesOfCorrectTypeRule } from 'graphql';

const LOGIN = gql`
    mutation Login($email: String!, $password: String! ) {
        login(email: $email, password: $password) {
            userId
            token
        }
}`;

export default function Login ({navigation}) {

    const  [login, {data, loading, error} ]= useMutation(LOGIN);
    
    const validations= yup.object().shape({
        username: yup.string()
            .required('Campo obligatorio'),
        // password: yup.string()
        //     .min(8, min => `La contraseña debe tener al menos ${min} caracteres`)
        //     .required('Campo obligatorio')
    })

    console.log(data)
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
            <Text style={styles.title}>LOGIN</Text>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={  (values) => {
                     login({ variables: { email: values.username, password: values.password } });
                    if(error) {
                     return console.log(error)
                    } 
                    navigation.navigate("Welcome")
                }
            }
            validationSchema={validations}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldTouched }) => (
                <View style={styles.form}>
                    <Text>Usuario</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                    />
                    {touched.username && errors.username &&
                    <Text style={{ fontSize: 12, color: '#FF0D10'}}>{errors.username}</Text>}
                    <Text style={{marginTop: 15}}>Contraseña</Text>
                    
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    /> 
                    {touched.password && errors.password &&
                    <Text style={{ fontSize: 12, color: '#FF0D10'}}>{errors.password}</Text>}
                    <TouchableOpacity style={styles.boton}  onPress={handleSubmit}>
                        <Text style={{fontWeight: 'bold'}} >INGRESAR</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  style={{marginTop: 15,textAlign:"center"}} onPress={() => navigation.navigate('Register')}>
                        <Text style={{fontWeight: 'bold'}}>Registrarse</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  style={{marginTop: 15}}  disabled={!isValid} onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={{fontWeight: 'bold'}}>Olvide mi contraseña</Text>
                    </TouchableOpacity> 
                        
                </View>
                )}
            </Formik>
        </View>
        </>
    )
}

// Estilos

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
    rect2 : {
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
        marginTop: 100,
        marginBottom: -25,
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
        borderRadius: 16,
        height: 30, 
        width: '70%',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 30
    },
   
  });
