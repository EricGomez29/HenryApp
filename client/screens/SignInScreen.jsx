import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import Style from '../styles/signIn';
import {Formik} from 'formik';

export default function SignInForm ({navigation}) {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
                console.log(values)
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.container}>
                    <Text style={{marginTop: 15}}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    <Text style={{marginTop: 15}}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                    <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                        <Text style={{fontWeight: 'bold'}}>Iniciar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  style={{marginTop: 15}} onPress={() => navigation.navigate('Register')}>
                        <Text style={{fontWeight: 'bold'}}>No tenes cuenta? Registrate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{marginTop: 15}} onPress={() => navigation.navigate('resetearContraseña')}>
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