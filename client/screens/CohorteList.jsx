import React from 'react'
import {gql,useQuery} from '@apollo/client'
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';

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
            <ListItem key={e.number}>
                <ListItem.Content>
                    <ListItem.Title> 
                        Cohorte #{e.number}
                        Alumnos: {e.users.length}
                    </ListItem.Title> 
                </ListItem.Content>
            </ListItem>
        )
    });
    
    return(
        <ScrollView>
            {resp}
        </ScrollView>
    )
}