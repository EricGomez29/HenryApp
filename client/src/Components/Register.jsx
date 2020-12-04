import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';

export default function Register(){
    return (
        <Formik
            initialValues={{ name: '', email: '', password: '', repeatPassword: '' }}
            onSubmit={values => console.log(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={styles.container}>
                <Text style={{marginTop: '15px'}}>Name</Text>
                <TextInput
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                />
                 <Text style={{marginTop: '15px'}}>Email</Text>
                <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                />
                 <Text style={{marginTop: '15px'}}>Contraseña</Text>
                <TextInput
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                />
                <Text style={{marginTop: '15px'}}>Repite la Contraseña</Text>
                <TextInput
                style={styles.input}
                onChangeText={handleChange('repeatPassword')}
                onBlur={handleBlur('repeatPassword')}
                value={values.repeatPassword}
                />
                <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                    <Text style={{fontWeight: 'bold'}}>Registrame</Text>
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
      borderRadius: '15px',
      border: '1px solid yellow',
      height: '30px',
      width: '70%',
      marginTop:'5px'
  },
  boton: {
      backgroundColor: 'yellow',
      borderRadius: '15px',
      height: '30px', 
      width: '70%',
      alignItems: "center",
      justifyContent: "center",
      marginTop: '15px'
  }

});

