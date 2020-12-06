import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import {Formik} from 'formik';
import  * as yup from 'yup'
import { Container } from '../styles/Container'


export default function SignInForm ({navigation}) {
const validations= yup.object().shape({
                email: yup.string()
                .email('El email tiene que ser un Email valido')
                .required('Campo obligatorio'),
                password: yup.string()
                .min(8, ({min})=> `La contraseña debe tener al menos ${min} caracteres`)
                .required('Campo obligatorio')
            })
    return (
    <Container>
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
                console.log(values)
            }}
            validationSchema={validations}
            
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldTouched }) => (
                <View>
                    {/* <Text style={styles.title}>LOGIN</Text> */}
                    <Text style={{textAlign:"center"}}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    /> {touched.email && errors.email &&
                    <Text  style={{ fontSize: 12, color: '#FF0D10'}}>{errors.email}</Text>}
                    <Text style={{textAlign:"center"}}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    /> 
                    {touched.password && errors.password &&
                    <Text style={{ fontSize: 12, color: '#FF0D10'}}>{errors.password}</Text>}
                    <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                        <Text style={{fontWeight: 'bold'}} onPress={() => navigation.navigate('Welcome')}>INGRESAR</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  style={{marginTop: 15,textAlign:"center"}} onPress={() => navigation.navigate('Register')}>
                        <Text style={{fontWeight: 'bold'}}>Registrarse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{marginTop: 15,textAlign:"center"}}  disabled={!isValid} onPress={() => navigation.navigate('resetearContraseña')}>
                        <Text style={{fontWeight: 'bold'}}>Olvide mi contraseña</Text>
                    </TouchableOpacity>
                    
                </View>
            )}
        </Formik>
    </Container>
    )
}

//estilos

const styles = StyleSheet.create({
    title: {
        marginTop:100,
        fontSize: 20,
        textAlign:"center",
        fontWeight: 'bold',
    },
  
    input: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'yellow',
        height: 30,
        width: 250,
        marginTop: 5,
        alignItems: "center",
        
        
    },
    boton: {
        backgroundColor: 'yellow',
        borderRadius: 16,
        height: 30, 
        width: '70%',
        marginLeft:36,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        
    },
   
  });