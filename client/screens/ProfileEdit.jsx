import React from 'react'
import { Formik } from 'formik';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text } from 'react-native-paper';

const ProfileEdit = ({ route, navigation }) => {

    console.log(route.params);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" color='#3b3b3b' size={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.userInfoSection}>
                <Formik
                    initialValues={{
                        country: '',
                        firstName: '',
                        lastName: '',
                        username: '',
                        email: '',
                        cohorte: '',
                        nroTelefono: '',
                    }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.form}>
                            <Text style={styles.textLabel}>Pais</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Argentina"
                                onChangeText={handleChange('country')}
                                onBlur={handleBlur('country')}
                                value={values.country}
                            />
                            <Text style={styles.textLabel}>Nombre</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nombre"
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                            />
                            <Text style={styles.textLabel}>Apellido</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Apellido"
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                            />
                            <Text style={styles.textLabel}>Usuario</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nombre de Usuario"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                            <Text style={styles.textLabel}>Email</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <Text style={styles.textLabel}>Cohorte</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Cohorte"
                                onChangeText={handleChange('cohorte')}
                                onBlur={handleBlur('cohorte')}
                                value={values.cohorte}
                            />
                            <Text style={styles.textLabel}>Telefono</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Telefono - Opcional"
                                onChangeText={handleChange('nroTelefono')}
                                onBlur={handleBlur('nroTelefono')}
                                value={values.nroTelefono}
                            />
                            <View style={styles.containerBoton}>
                                <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>INICIAR SESION</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    boton: {
        marginTop: 10,
        width: 180,
        height: 40,
        backgroundColor: 'yellow',
        borderRadius: 100,
        justifyContent: "center",
        alignItems: 'center'
    },
    boton: {
        backgroundColor: '#FFFF01',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginVertical: 20,
    },
    form: {
        marginTop: 20,
    },
    textLabel: {
        color: '#777777',
        marginBottom: 5,
        marginTop: 5,
    },
    textInput: {
        border: '1px solid #BBD2C5',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
})


export default ProfileEdit;