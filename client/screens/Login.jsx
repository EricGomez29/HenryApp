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
<<<<<<< HEAD
            .required('Campo obligatorio'),
        password: yup.string()
            .min( 8, ( { min } )  => `La contraseña debe tener al menos ${min} caracteres`)
            .required('Campo obligatorio')
=======
        .required('Campo obligatorio'),
        password: yup.string()
        .min(8, min => `La contraseña debe tener al menos ${min} caracteres`)
        .required('Campo obligatorio')
>>>>>>> 35cb5ffa2f3981c8165ff0600bb6bdfc0c1b0804
    })
    
    const  [login, {data} ]= useMutation(LOGIN);

<<<<<<< HEAD
    const handleSubmit = (values) => {
        login( { variables: { email: values.username, password: values.password } } );
        if(error) {
            return console.log(error)
        } 
        navigation.navigate("Welcome")
       }

    console.log(data)
=======
>>>>>>> 35cb5ffa2f3981c8165ff0600bb6bdfc0c1b0804
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
<<<<<<< HEAD
                onSubmit={handleSubmit}
                validationSchema={validations}
=======
                onSubmit={   (values) => {
                     login({ variables: { email: values.email, password: values.password } });
                    console.log(values)
                    navigation.navigate("Welcome")
                    console.log(data)
                }
            }
            validationSchema={validations}
>>>>>>> 35cb5ffa2f3981c8165ff0600bb6bdfc0c1b0804
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
<<<<<<< HEAD
=======

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
>>>>>>> 35cb5ffa2f3981c8165ff0600bb6bdfc0c1b0804
