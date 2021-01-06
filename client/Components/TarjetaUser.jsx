import React from 'react';
// import {View, Text} from 'react-native';
import { View, Text} from 'dripsy';
import { Avatar, Title, Caption} from 'react-native-paper';
import {styles } from '../styles/TarjetaUserStyle';


export default function TarjetaUser({users}){
    return (
        <View style={styles.container} sx={{flexDirection: ['column', 'row']}} >
            {users && users.map(u => {
                return (
                <View style={styles.tarjeta} key={u._id}>
                    <View style={styles.todo}>                          
                        <Avatar.Image
                            size={100}
                            source={u.image}
                        />
                        <Text style={styles.nombre}>{u.firstName}</Text>
                        <Text style={styles.apellido}>{u.lastName}</Text>
                        {/* <Text style={{marginTop: 10, marginBottom: 15}}>Nacionalidad: {u.nationality}</Text>                          */}
                    </View>
                </View>
                )
            })}
        </View>
    )
}
