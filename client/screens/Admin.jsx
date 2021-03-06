import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {styles} from '../styles/AdminStyles';
import Particles from './Particles';
import { Icon } from 'react-native-elements';

export function AdminList ({navigation}){
    return (
        <View style={{width: '100%'}}>
            <View style={styles.container} >

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ListItem key={1} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title><Icon type='font-awesome-5' name='angle-double-left'/></ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('StudentsList')}>
                    <ListItem key={4} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Ver alumnos</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('CohorteList')}>
                    <ListItem key={4} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Ver Cohortes</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>

                <TouchableOpacity >
                    <ListItem key={2} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Agregar/Eliminar Cohorte</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>

                <TouchableOpacity >
                    <ListItem key={2} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Agregar/Eliminar Alumnos del cohorte</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('AgregarStandUp')}>
                    <ListItem key={3} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Agregar Stand Up</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('AddUserStand')}>
                    <ListItem key={4} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Armar grupos de StandUp</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('StudentsList')}>
                    <ListItem key={4} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Agregar PM</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>

                <TouchableOpacity>
                    <ListItem key={4} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>Agregar Administrador</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export function Admin({navigation}){  
    return(
        <View style={{backgroundColor: "black", height: "100%"}}>
            <View style={{width: '100%', height: '99%', position: 'absolute', zIndex: -1}}>
                <Particles />
            </View>
            <AdminList navigation={navigation}/>
        </View>
    )

}