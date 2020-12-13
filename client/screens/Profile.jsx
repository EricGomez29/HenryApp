import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { gql, useQuery } from '@apollo/client'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const USER = gql`
    query Users($username: String){
        users(where: { username: $username }) {
            username
            firstName
            lastName
            cohorte
            email
        }
    }`;

const username = "Aye";

export const Profile = ({ navigation }) => {
    const { loading, data } = useQuery(USER, {
        variables: { username }
    });
    if (loading) return <View><Text>Loading</Text></View>

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={styles.userNavigation}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" color='#3b3b3b' size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileEdit', { myData: data })}>
                        <Icon name="account-edit" color='#3b3b3b' size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        size={80}
                        source={'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{data.users[0].firstName + ' ' + data.users[0].lastName}</Title>
                        <Caption style={styles.caption}>{data.users[0].username}</Caption>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="map-marker-radius" color="#3b3b3b" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>Argentina</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="phone" color="#3b3b3b" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>+54 XXXXX-XXXX</Text>
                </View>
                <View style={styles.row}>
                    <Icon name="email" color="#3b3b3b" size={20} />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{data.users[0].email}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export const ProfileEdit = ({ route, navigation }) => {

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    btn: {
        backgroundColor: '#FFFF01',
        color: '#fff',
        padding: 10,
    },
    userNavigation: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
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
});