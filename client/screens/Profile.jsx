import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Profile = ({ navigation }) => {

    const handleOnEdit = () => {
        navigation.navigate('ProfileEdit');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={styles.userNavigation}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text>Atras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOnEdit}>
                        <Icon name="account-edit" color='#3b3b3b' size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        size={80}
                        source={require('../assets/logoHenry.png')}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>Fulanito Tal</Title>
                        <Caption style={styles.caption}>@fulano</Caption>
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
                    <Text style={{ color: "#777777", marginLeft: 20 }}>mi@gmail.com</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};


export const ProfileEdit = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text>Atras</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

export const ProfilePhoto = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View>
                <Text>mi foto</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
});