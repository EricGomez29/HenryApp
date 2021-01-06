import React from 'react';
import { ScrollView, View, Text, TextInput, Button, Image, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import  * as yup from 'yup';
import { styles } from '../styles/styles';
import { EDIT_USER } from '../apollo/user';
import { useMutation } from '@apollo/client';

export default function ChangeOnlyPassword ({navigation, route}) {
    console.log(route.params)
    const [editPassword] = useMutation(EDIT_USER);

    const validations = yup.object().shape({
        password: yup.string()
            .min(8, ( {min} ) => `La contraseña debe tener al menos ${min} caracteres`)
            .required('Campo obligatorio'),
        repeatPassword: yup.string()
            .required('Campo obligatorio')
            .oneOf([yup.ref('password'), null], 'Las contraeñas deben coincidir.')
    })

    const handleSubmit = async (values) => {
        try {
            const response = await editPassword({
                variables: {
                    username: route.params.username,
                    password: values.password
                }
            })
            console.log(response);
            navigation.navigate('PruebaBoton')
        } catch (error) {
            console.log(error);    
        }
    }

    return (
        <View style={{flex: 1}}>
            
            <View style={{width: 270, height: 350}}>

                <Formik
                    initialValues={{password: '', repeatPassword: ''}}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={validations}
                >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (
                        <View style={{height: 320}}>
                            {/* CAMPO PASSWORD */}
                            <View style={{marginTop: 10}}>
                                <TextInput 
                                placeholder='Contraseña'
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={styles.input}/>  
                            </View>
                            {/* ERROR PASSWORD */}
                            {touched.password && errors.password &&
                            <Text style={styles.errorForm}>{errors.password}</Text>}

                            {/* CAMPO REPEAT PASSWORD */}
                            <View style={{marginTop: 10}}>
                                <TextInput 
                                placeholder='Repite la contraseña'
                                secureTextEntry={true}
                                onChangeText={handleChange('repeatPassword')}
                                onBlur={handleBlur('repeatPassword')}
                                value={values.repeatPassword}
                                style={styles.input}/> 
                            </View>
                            {/* ERROR REPEAT PASSWORD */}
                            {touched.repeatPassword && errors.repeatPassword &&
                            <Text style={styles.errorForm}>{errors.repeatPassword}</Text>}
                            
                            {/* EDITAR CONTRASEÑA */}
                            <View style={styles.containerBoton}>
                                <TouchableOpacity style={styles.boton} disabled={!isValid} onPress={handleSubmit}>
                                    <Text style={{color: 'black', fontWeight: 'bold'}}>Cambiar Contraseña</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}
