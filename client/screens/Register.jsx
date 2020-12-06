import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'

export default function Register({navigation}){

 const validations= yup.object().shape({
                name: yup.string()
                .min(3, 'Demasiado corta, intentá con un nombre mas largo')
                .max(20, 'Demasiado larga, intentá con un nombre mas corto')
                .required('Este campo es obligatorio, por favor decime tu nombre'),
                email: yup.string()
                .email('El Email tiene que ser un Email valido')
                .required('este campo es obligatorio, por favor decime tu email'),
                password: yup.string()
                .min(8, ({min})=> `La contraseña debe tener al menos ${min} caracteres`)
                .required('este campo es obligatorio, por favor pone tu contraseña'),
               repeatPassword: yup.string()
               .min(8, ({min})=> `La contraseña de confirmacion debe tener al menos ${min} caracteres`)
                .required('este campo es obligatorio, por favor pone la confirmacion de tu contraseña')
            })

    return (
        <Formik
            initialValues={{ name: '', email: '', password: '', repeatPassword: '' }}
            onSubmit={values => console.log(values)}
            validationSchema={validations}

        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <View style={styles.container}>
                <Text style={{marginTop: 15}}>Nombre</Text>
                <TextInput
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                />
                {touched.name && errors.name &&
                <Text  style={{ fontSize: 12, color: '#FF0D10'}}>{errors.name}</Text>}
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
                <Text  style={{ fontSize: 12, color: '#FF0D10'}}>{errors.password}</Text>}
                <Text style={{marginTop: 15}}>Repite la Contraseña</Text>
                <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={handleChange('repeatPassword')}
                onBlur={handleBlur('repeatPassword')}
                value={values.repeatPassword}
                />
                {touched.repeatPassword && errors.repeatPassword &&
                <Text  style={{ fontSize: 12, color: '#FF0D10'}}>{errors.repeatPassword}</Text>}
                <TouchableOpacity style={styles.boton}  disabled={!isValid} onPress={handleSubmit}>
                    <Text style={{fontWeight: 'bold'}}>Registrarme</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 15}} onPress={() => navigation.navigate('Login')}>
                    <Text style={{fontWeight: 'bold'}}>Ya tenes cuenta? Inicia Sesion</Text>
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
      marginTop: 5
  },
  boton: {
      backgroundColor: 'yellow',
      borderRadius: 15,
      height: 30, 
      width: '70%',
      alignItems: "center",
      justifyContent: "center",
      marginTop: 15
  }

});

