import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Title, Caption, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default Profile = ({ route, navigation }) => {

    console.log(route.params);

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