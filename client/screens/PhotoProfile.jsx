import React, { useState } from 'react';
import { View, TextInput, Avatar, Text, Button, Image } from 'react-native';
// import { globalStyles } from '../styles/global'
import { Formik } from "formik";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { useMutation } from '@apollo/client';
import { EDIT_USER } from '../Querys/userQuery';

export default function PhotoProfile({ route, navigation }) {

    const [image, setImage] = useState(null);
    const [editProfile] = useMutation(EDIT_USER);
    const [data, setData] = useState();

    const handleSubmit = async (values) => {
        const response = await editProfile({
            variables: {
                image: image
            }
        })
        setData(response.data.editUser);
        navigation.navigate('Profile', {
            profileData: {
                users: [response.data.editUser],
            }
        })

    }

    const getPermissionAsync = async () => {
        if (Constants.platform.android) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }
    
    const _pickImage = async () => {
        getPermissionAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
            base64: true
        });
        console.log(result)
        if (!result.cancelled) {
            setImage(result.uri)
            // console.log(result.uri)
         // Getting Image URI value here
        }
    };

    const takePhoto = async () => {
        getPermissionAsync()
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
            base64: true
        });
        if (!result.cancelled) {
            setImage(result.uri)
            // console.log(result.uri)
         // Getting Image URI value here
        }
    }
   
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
            title="Seleccionar Imagen"
            icon="add-a-photo" mode="contained"
            onPress={_pickImage}
            />
        <Button
            title="Tomar Foto"
            icon="add-a-photo" mode="contained"
            onPress={ takePhoto }
            />
            {image && <Image source={{ uri: image }} style={{borderRadius:100, width: 200, height: 200 }} />}
            
        <Button
            title="Aceptar"
            mode="contained"
            onPress={ handleSubmit }
            />
    </View>
  );
}
                                
            