import React, { useState } from 'react'
import { Formik } from 'formik';
import { View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Text } from 'react-native-paper';
import { styles } from '../styles/ProfileEditStyles';
import { gql, useMutation } from '@apollo/client';
import Particles from './Particles';
import MenuDesplegable from './MenuDesplegable';

const ProfileUser = ({ route, navigation }) => {
    
    const EDIT_USER = gql`mutation editUser($username: String $isAdmin: Boolean) {
	    editUser (input: {
            username: $username
            isAdmin: $isAdmin
        }){
            username
            firstName
            lastName
            nationality
            phone
            email
            cohorte
            image
            isPM
            isAdmin
            listPM
        }
}`;


    const [data, setData] = useState(route.params.data)
    console.log(data)
    const [editProfile] = useMutation(EDIT_USER);
    const handleSubmit = async (values) => {
        try {
            console.log(!values.isAdmin)
            const response = await editProfile({
                variables: {
                    username: values.username,
                    isAdmin: !values.isAdmin,
                }
            })
            console.log(response.data);
            navigation.navigate("ProfileUser", {data: response.data.editProfile})
        } catch (error) {
            console.log(error);    
        }
    }
  
        
    return (
        <SafeAreaView style={styles.container}>
            <View style={{width: 50, zIndex: 5}}>
                <MenuDesplegable navigation={navigation} />
            </View>
            <View style={{width: '100%', height: "98%", position: 'absolute', zIndex: -1}}>
                <Particles />
            </View>  
            <View style={styles.userInfoSection}>
                <Formik
                    initialValues={{
                        country: data.nationality || '',
                        firstName: data.firstName,
                        lastName: data.lastName,
                        username: data.username,
                        email: data.email,
                        nationality: data.nationality || '',
                        phone: data.phone || '',
                        cohorte: data.cohorte || '',
                        nroTelefono: data.phone || '',
                        image: data.image || `https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50s=200`,
                        isAdmin: data.isAdmin,
                        isPM: data.isPM,
                        listPM: data.isPM
                    }}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={styles.form}>
                            
                            <Avatar.Image
                                size={200}
                                source={values.image}
                            />
                            
                            <Text style={styles.textLabel}>Pais</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Argentina"
                                onChangeText={handleChange('nationality')}
                                onBlur={handleBlur('nationality')}
                                value={values.nationality}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Nombre</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nombre"
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                                editable={false}

                            />
                            <Text style={styles.textLabel}>Apellido</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Apellido"
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Usuario</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Nombre de Usuario"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Email</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Cohorte</Text>
                            
                            <TextInput
                                style={styles.textInput}
                                placeholder="Cohorte"
                                onChangeText={handleChange('cohorte')}
                                onBlur={handleBlur('cohorte')}
                                value={values.cohorte}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Telefono</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Telefono - Opcional"
                                
                                value={values.phone}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Grupo de Stand-Up</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="No definido"
                                value={values.standUp}
                                editable={false}
                            />
                            <Text style={styles.textLabel}>Es Administrador</Text>
                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Cohorte"
                                    onChangeText={handleChange('isAdmin')}
                                    onBlur={handleBlur('isAdmin')}
                                    value={values.isAdmin}
                                    editable={false}
                                />

                            </View>
                            <Text style={styles.textLabel}>Es PM</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Es PM"
                                
                                value={values.isPM}
                                editable={false}
                            />
                            
                                
                            
                            <View style={styles.containerBoton}>
                                <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Hacerlo Administrador</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.containerBoton}>
                                <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Hacerlo PM</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
    
}

export default ProfileUser;