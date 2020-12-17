import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import  * as yup from 'yup'
import { gql, useMutation, useQuery } from '@apollo/client';
import { styles } from '../styles/LoginStyle'
import Footer from '../Components/Footer'

const LOGIN = gql`
    mutation Login($email: String!, $password: String! ) {
        login(email: $email, password: $password) {
            userId
            token
        }
}`;

export default function Login ( {navigation} ) {

    const validations= yup.object().shape({
        email: yup.string()
            .required('Campo obligatorio'),
        password: yup.string()
            .min( 8, ( { min } )  => `La contraseña debe tener al menos ${min} caracteres`)
            .required('Campo obligatorio')
    })
    
    const  [login, {data} ]= useMutation(LOGIN);

    const handleSubmit = (values) => {
        login( { variables: { email: values.email, password: values.password } } );
        if(error) {
            return console.log(error)
        } 
        // navigation.navigate("Welcome")
       }

    console.log(data)
    return (
        <View style={{flex: 1}}>
            
            <View style={{width: 270}}>
                
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validations}
                >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldTouched }) => (
                    <View style={{width: '90%'}}>
                        <View style={styles.containerBoton}>
                            <View >
                                <TextInput 
                                placeholder= 'Email'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                style={styles.input}/> 
                            </View>
                            {/* ERROR EMAIL */}
                            {touched.username && errors.email &&
                            <Text style={styles.errorForm}>{errors.email}</Text>}

                            <View style={{marginTop: 10}}>
                                <TextInput
                                placeholder='Contraseña' 
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={styles.input}/>
                            </View>
                            {/* ERROR CONTRASEÑA */}
                            {touched.password && errors.password &&
                            <Text style={styles.errorForm}>{errors.password}</Text>}
                        </View>
                        <View style={styles.containerBoton}>
                            <TouchableOpacity  onPress={() => {navigation.navigate('ForgotPassword')}} style={styles.olvideContraseña}>
                                <Text style={{color: 'black'}}>Olvide mi contraseña</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerBoton}>
                            <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                                <Text style={{color: 'black', fontWeight: 'bold'}}>INICIAR SESION</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerBoton}>
                            <TouchableOpacity style={styles.olvideContraseña}>
                                <Text style={{color: 'black'}}>Tambien podes ingresar con:</Text>
                            </TouchableOpacity>
                        </View>
{/* 
                        <View style={{flexDirection: 'row', justifyContent: "center", marginTop: 10}}>
                            <TouchableOpacity style={{ backgroundColor: '#3B5998', borderRadius: 100, width: 48, height: 48, marginRight: 10 }}>
                                <Icon name="logo-facebook" style={{fontSize:20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 100, width: 48, height: 48, marginLeft: 10 }}>
                                <Icon name="logo-google" style={{fontSize:20}}/>
                            </TouchableOpacity>
                        </View> */}
                        <View style={styles.containerBoton}>
                            <TouchableOpacity   style={styles.olvideContraseña} onPress={() => {navigation.navigate('Welcome')}}>
                                <Text >-ir a welcome-</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    )}
                </Formik>
                    
            </View>
        </View>
    )
}
