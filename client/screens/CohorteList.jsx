import React from 'react'
import {gql,useQuery} from '@apollo/client'
import {StyleSheet, Button, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import Particles from './Particles';
import {View, Text} from 'dripsy'
import MenuDesplegable from './MenuDesplegable';

const COHORTES = gql `
query Cohortes{
    cohortes{ 
        number
        users {
            username
        }
    }
}`

export default function ({navigation}){
    const {data, error, loading} = useQuery(COHORTES)

    
    if(loading) return <Text> Loading...</Text>
    
    if(error) return <Text> ` Error ... ${error.message}`</Text>

    const resp = data?.cohortes.map(e => {
        return (
            <ListItem key={e.number} bottomDivider>
                <ListItem.Chevron/>
                <ListItem.Content>
                    <ListItem.Title>Cohorte Nº{e.number}</ListItem.Title> 
                    <ListItem.Subtitle> Alumnos: {e.users.length}</ListItem.Subtitle> 
                </ListItem.Content>
            </ListItem>
        )
    });
    
    return(
        <View style={{backgroundColor: "black", height: "100%"}}>
            <View style={{width: '100%', height: '99%', position: 'absolute', zIndex: 1}}>
                <Particles />
            </View>
            <View style={{zIndex: 5, width: 50}}>
                <MenuDesplegable navigation={navigation}/>
            </View>
            <View sx={{ marginTop: 30, width: ["85%", 450], alignSelf: "center"}}>
                <Text sx={{fontSize: [30, 45], textAlign: "center", fontWeight: "bold", color: "white"}}>
                    Lista de Cohortes
                </Text>
            </View>
            <View sx={{ marginTop: 15, padding: 10, width: ["85%", 320], alignSelf: "center", backgroundColor: "#fff9", borderRadius: 10}}>
                <Text sx={{ textAlign: "center", color: "black", fontWeight: "bold"}}>
                    Para ver los alumnos dirigase a la seccion 'Ver Alumnos'
                </Text>
            </View>
            <View style={{width: "85%", alignSelf: "center", marginTop: 40}}>
                {resp}
            </View>
        </View>
    )
}