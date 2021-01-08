import React from 'react';
import {View, Text, Image} from 'react-native';
import {GET_USERCOHORTES} from '../apollo/user';
import Particles from './Particles';
import { useQuery } from '@apollo/client';
import { ListItem, Avatar } from 'react-native-elements';
import ImagenDefecto from '../Components/ImagenDefecto';

export default function Compañeros({navigation}){
    const cohorte = localStorage.getItem('Cohorte')
    const numero = parseInt(cohorte)
    const { loading, data, error } = useQuery(GET_USERCOHORTES, {
        variables: {
            number: numero
        }
    })
    console.log(data)
    const usuarios = data?.cohortes[0]?.users

    return(
        <View style={{width: '100%', height: 'auto', backgroundColor: 'black'}}>
            <View style={{width: '100%', height: '99%', position: 'absolute', zIndex: 1}}>
                <Particles />
            </View>
            <Text style={{color: 'white', fontSize: 25, margin: 20}}>Cohorte Nº: {numero}</Text>
            <View style={{width:'90%', backgroundColor: '#fff9', padding: 10, alignSelf: 'center', zIndex: 10}}>
                <View style={{width: '80%', alignSelf: 'center'}}>
                {
                        usuarios && usuarios.map((u, i) => {
                            return (
                                <ListItem key={i} onPress={() => navigation.navigate('ProfileUser', { data: u })}>
                                    <ImagenDefecto nombre={u.firstName}/>
                                    {/* <Image source={u.image || `https://cdn.theorg.com/d3119e0e-8202-4034-85ce-d0356382515e_thumb.jpg`} style={{width:40, height:40}}/> */}
                                    <ListItem.Content>
                                        <View style={{display: "flex", width:"100%", flexDirection: "row"}}>
                                            <ListItem.Title>{u.firstName} {''}</ListItem.Title>
                                            <ListItem.Title>{u.lastName}</ListItem.Title>
                                        </View>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            )
                        })
                    }
                    </View>
                </View>
        </View>
    )
}