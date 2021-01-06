import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {styles} from '../styles/AdminStyles';

export function AdminList ({navigation}){
    return (
        <View>
            <View style={styles.container} >

                <ListItem key={1} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title></ListItem.Title>
                    </ListItem.Content>
                </ListItem>

                <TouchableOpacity >
                    <ListItem key={2} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Agregar Cohorte</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('AgregarStandUp')}>
                    <ListItem key={3} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Agregar Grupo Stand Up</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>

                <TouchableOpacity>
                    <ListItem key={4} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Ver alumnos</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export function Admin(){  
    return(
        <View>
            <View style={{width: '100%', height: 500, position: 'absolute'}}>
                <Image
                    source={require("../assets/FondoAmarillo2.png")}
                    style={{width: '100%', position: 'absolute', height: 500}}
                ></Image>
            </View>
            <AdminList/>
        </View>
    )

}