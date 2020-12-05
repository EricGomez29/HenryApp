import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import Style from '../styles/signIn';
import Formik from 'formik';

const SignInForm = () => {
    return (
        <View>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {

                }}
            >
                {(props) => (
                    <View>
                        <TextInput
                            placeholder='Email'
                            onChangeText={props.handleChange()}
                        />
                        <TextInput
                            placeholder='Password'
                            onChangeText={props.handleChange()}
                        />
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default SignInForm;