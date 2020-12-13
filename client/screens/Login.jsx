import React from 'react';
import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Tab, Tabs, TabHeading, Icon} from 'native-base';
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

export default function Login ({navigation}) {

    
    const validations= yup.object().shape({
        username: yup.string()
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
        navigation.navigate("Welcome")
       }

    console.log(data)
    return (
        <View style={{flex: 1}}>
            
            <Image
                source={require("../assets/logoHenry.png")}
                resizeMode="contain"
                style={styles.imgHenry}
            ></Image>
            <View style={styles.container}>
                <View style={styles.cuadro}>
                    <View>
                        {/* <Header hasTabs /> */}
                        <Tabs style={styles.botones}>
                            <Tab heading={ <TabHeading ><Text>Iniciar Sesion</Text></TabHeading>} >
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    onSubmit={handleSubmit}
                                    validationSchema={validations}
                                >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, setFieldTouched }) => (
                                    <View style={{width: '90%'}}>
                                        <View >
                                            <Item floatingLabel>
                                                <Label>Email</Label>
                                                <Input onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                style={{height: 50}}/>
                                            </Item>
                                        </View>
                                        {/* ERROR EMAIL */}
                                        {touched.username && errors.email &&
                                        <Text style={styles.errorForm}>{errors.email}</Text>}

                                        <View style={{marginTop: 10}}>
                                            <Item floatingLabel>
                                                <Label>Contraseña</Label>
                                                <Input secureTextEntry={true}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                style={{height: 50}}/>
                                            </Item>
                                        </View>
                                        {/* ERROR CONTRASEÑA */}
                                        {touched.password && errors.password &&
                                        <Text style={styles.errorForm}>{errors.password}</Text>}

                                        <View style={styles.containerBoton}>
                                            <Button style={styles.boton} onPress={handleSubmit}>
                                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>INGRESAR</Text>
                                            </Button>
                                        </View>
                                    
                                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                            <Text style={styles.linkForm}>Registrarse</Text>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                            <Text style={styles.linkForm}>Recuperar contraseña</Text>
                                        </TouchableOpacity> 
                                            
                                    </View>
                                    )}
                                </Formik>
                            </Tab>

                            <Tab heading={ <TabHeading><Text>Registrarse</Text></TabHeading>}>
                                <Text>Chau</Text>
                            </Tab>
                        </Tabs>
                    </View>
                </View>
            {/* <View>
            <Footer/>  
            </View> */}
            </View>
        </View>
    )
}
