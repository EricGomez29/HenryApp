import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import  * as yup from 'yup'

export default function ForgotPassword ({navigation}) {

    const validations= yup.object().shape({
        email: yup.string()
            .email('Email inválido')
            .required('Campo obligatorio'),
    })

    return (
        <>
        <View style={styles.rect}>
            <Image
                source={require("../assets/logoHenry.png")}
                resizeMode="contain"
                style={styles.henry}
                onPress={() => navigation.navigate('Home')}
            ></Image>
            
        </View>
        <View style={styles.rect2}>
            <Text style={styles.title}>RECUPERAR CONTRASEÑA</Text>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={ values => { console.log(values) }}
                validationSchema={validations}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldTouched }) => (
                <View style={styles.form}>
                    <Text>Ingrese su email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                    {touched.email && errors.email &&
                    <Text style={{ fontSize: 12, color: '#FF0D10'}}>{errors.email}</Text>}                    
                
                    <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                        <Text style={{fontWeight: 'bold'}} onPress={() => navigation.navigate('Login')}>Confirmar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  style={{marginTop: 15}} onPress={() => navigation.navigate('Login')}>
                        <Text style={{fontWeight: 'bold'}}>Volver</Text>
                    </TouchableOpacity>    
                </View>
                )}
            </Formik>
        </View>
        </>
    )
}

//estilos

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
        marginTop: 120,
        marginBottom: -25,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    form: {
        marginTop: -100,
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
        marginTop: 20,
        justifyContent: "center"
    },
    boton: {
        backgroundColor: 'yellow',
        borderRadius: 100,
        height: 35, 
        width: '70%',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 30
    },
   
  });