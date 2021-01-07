import React from 'react';
import {Text} from 'react-native';
import {View} from 'dripsy'
import {AdminList} from './Admin';

export default function AddUserStand({navigation}){
    return(
        <View style={{height: '100%', backgroundColor: 'white'}} >
            <View style={{width: '100%', height: 500, position: 'absolute'}}>
                <Image
                    source={require("../assets/FondoAmarillo2.png")}
                    style={{width: '100%', position: 'absolute', height: 500}}
                ></Image>
            </View>
            <View sx={{position: 'absolute', width: [0, 0, 300], opacity: [0, 0, 100], zIndex: [-1, -1, 1]}}>
                <AdminList/>
            </View>

        </View>

    )
}