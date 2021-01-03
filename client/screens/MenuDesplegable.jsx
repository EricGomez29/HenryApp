import React from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native'

export default function Menu (){
    const navigation = useNavigation()
    return (
        <View>
            <Button title='Menu' onPress={() => navigation.openDrawer()}></Button>
            {/* <TouchableOpacity onPress={() => navigation.openDrawer()} >
                <Text>Menu</Text>
            </TouchableOpacity> */}
        </View>
    )
}