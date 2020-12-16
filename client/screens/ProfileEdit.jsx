import React from 'react'
import { Formik } from 'formik';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';

export default ProfileEdit = ({ route, navigation }) => {

    const { myData } = route.params;
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
                        firstName: myData.users[0].firstName,
                        lastName: myData.users[0].lastName,
                        username: myData.users[0].username,
                        email: myData.users[0].email,
                        cohorte: myData.users[0].cohorte,
                        nroTelefono: ''
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
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}