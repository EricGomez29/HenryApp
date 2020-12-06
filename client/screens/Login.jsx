import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import {Formik} from 'formik';
import  * as yup from 'yup'

export default function SignInForm ({navigation}) {
const validations= yup.object().shape({
                email: yup.string()
                .email('El email tiene que ser un Email valido')
                .required('este campo es obligatorio, por favor decime tu email'),
                password: yup.string()
                .min(8, ({min})=> `La contraseña debe tener al menos ${min} caracteres`)
                .required('este campo es obligatorio, por favor pone tu contraseña')
            })
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={ values => { console.log(values) }}
            validationSchema={validations}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldTouched }) => (
                <View style={styles.container}>
                    <Text style={{marginTop: 15}}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    {touched.email && errors.email &&
                    <Text  style={{ fontSize: 12, color: '#FF0D10'}}>{errors.email}</Text>}
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
                    <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                        <Text style={{fontWeight: 'bold'}} onPress={() => navigation.navigate('Welcome')}>Iniciar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  style={{marginTop: 15}} onPress={() => navigation.navigate('Register')}>
                        <Text style={{fontWeight: 'bold'}}>No tenes cuenta? Registrate</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  style={{marginTop: 15}}  disabled={!isValid} onPress={() => navigation.navigate('resetearContraseña')}>
                        <Text style={{fontWeight: 'bold'}}>Olvide mi contraseña</Text>
                    </TouchableOpacity> 
                    
                </View>
            )}
        </Formik>
    )
}

//estilos

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
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
        
    },
    boton: {
        backgroundColor: 'yellow',
        borderRadius: 15,
        height: 30, 
        width: '70%',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        
    },
   
  });