import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/ProfileStyles';

const Profile = ({ route, navigation }) => {
    const { username, email, firstName, lastName, image, cohorte } = route.params.profileData.users[0];
    console.log(route.params.profileData.users[0])
    const handleProfileEdit = () => {
        navigation.navigate('ProfileEdit', {
            modifyData: {
                username,
                email,
                firstName,
                lastName,
                image, 
                cohorte
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        size={200}
                        source={image}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{firstName}</Title>
                        <Caption style={styles.caption}>{username}</Caption>
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
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{email}</Text>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <TouchableOpacity style={styles.btn} onPress={handleProfileEdit}>
                    <View style={styles.row}>
                        <Icon name="account-edit" style={{ color: '#000000' }} size={20} />
                        <Text style={{ marginLeft: 20, color: '#000000', fontWeight: 'bold' }}>Editar Perfil</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Profile;
