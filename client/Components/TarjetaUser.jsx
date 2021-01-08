import React from 'react';
// import {View, Text} from 'react-native';
import { View, Text, ScrollView, Image} from 'dripsy';
import {styles } from '../styles/TarjetaUserStyle';
import {ListItem, Avatar} from 'react-native-elements';
import icon from '../assets/logoHenry.png';

export default function TarjetaUser({users}){
    return (
        <View style={styles.container}>
            {
                users && users.map((l, i) => {
                    return (
                        <ListItem key={i} bottomDivider>
                            <Image source={l.image || icon} style={{width: 50, height: 50, borderRadius: 100}}/>
                            <ListItem.Content style={styles.content}>
                                <ListItem.Title style={{fontSize: 17}}>{l.firstName}</ListItem.Title>
                                <ListItem.Subtitle style={{fontSize: 15}}>{l.lastName}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </View>
    )
}
