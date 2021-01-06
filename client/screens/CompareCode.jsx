import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import  * as yup from 'yup';
import { styles } from '../styles/styles';
import { COMPARE_CODE } from '../apollo/user';
import { useMutation } from '@apollo/client';
import { PanResponder } from 'react-native';

export default function CompareCode ({navigation, route}) {
    console.log(route.params)
    const [compareCode] = useMutation(COMPARE_CODE);

    const validations= yup.object().shape({
        code: yup.number('Valor númerico mayor a 0')
            .positive('No puede ingresar valores menores a 0.')
            .integer('El valor debe ser un Entero')
            .required('Valor necesario')
    })

    const  handleSubmit = async (values) => {
        try{
            const response = await compareCode({
                variables: {
                    codigo: parseInt(values.code),
                    email: route.params.email
                }
            });
            navigation.navigate("ChangeOnlyPassword", { username: response.data?.compareCode.username });
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
        <View style={styles.header}>
            <Image
                source={require("../assets/logoHenry.png")}
                resizeMode="contain"
                style={styles.imgHenry}
                onPress={() => navigation.navigate('Home'), {}}
            ></Image>
            
        </View>
        <View style={styles.body}>
            <Formik
                initialValues={{ code: '' }}
                onSubmit={ values =>  handleSubmit(values) }
                validationSchema={validations}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldTouched }) => (
                <View style={styles.form}>
                    <Text style={styles.h1}>INGRESE EL CÓDIGO DE RECUPERACION DE CONTRASEÑA</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('code')}
                        onBlur={handleBlur('code')}
                        value={values.code}
                    />
                    {touched.code && errors.code &&
                    <Text style={styles.error}>{errors.code}</Text>}                    
                
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