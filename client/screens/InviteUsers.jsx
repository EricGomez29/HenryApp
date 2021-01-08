import React, {useEffect, useState} from 'react';
import { View, TextInput, TouchableOpacity, Image, ScrollView, Text } from 'react-native';
import {Formik, yupToFormErrors} from 'formik';
import * as yup from 'yup'
import {gql, useMutation} from '@apollo/client';
import { styles } from '../styles/RegisterStyle';

const SEND_MAIL = gql`
    mutation SendEmail($email: String, $link: String){
        sendEmail(email: $email, link: $link){
            subject
            to
            text
            from
        }
    }
`;

export default function InviteUsers({navigation}) {

    const [ done, setDone ] = useState("")

    const validations = yup.object().shape({
        email: yup.string()
            .email('Email no válido')
            .required('Campo obligatorio'),
        })

    const [sendMail] = useMutation(SEND_MAIL);
    

    const handleSubmit = (values, {resetForm}) => {
        try {
            const response = sendMail({
                variables: {
                    email: values.email,
                    link: window.location
                }
            })

            resetForm()
            setDone(`Email enviado con éxito a ${values.email}`)
            
        } catch (error) {
            console.log(error)        
        }
    }

    return (
        <View style={{flex: 1}}>
            
            <View style={{width: 270, height: 350}}>

                <Formik
                    initialValues={{ email: ''}}
                    onSubmit={handleSubmit}
                    validationSchema={validations}
                >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (
                        <View style={{height: 320}}>

                            <View style={{marginTop: 10}}>
                                <TextInput 
                                    placeholder='Email'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    style={styles.input}/>
                            </View>

                            {touched.email && errors.email &&
                            <Text style={styles.errorForm}>{errors.email}</Text>}
                        
                            <View style={styles.containerBoton}>
                                <TouchableOpacity style={styles.boton} disabled={!isValid} onPress={handleSubmit}>
                                    <Text style={{color: 'black', fontWeight: 'bold'}}>Registrarme</Text>
                                </TouchableOpacity>
                            </View>
                            <View stlye={{alignItems: "center"}}>
                                <Text style={styles.success}>
                                    {done}
                                </Text>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}
