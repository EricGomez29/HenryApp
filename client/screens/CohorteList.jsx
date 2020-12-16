import React from 'react'
import {gql,useQuery} from '@apollo/client'
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';

const COHORTES = gql `
query Cohortes{
    cohortes{ 
        Number
    }
}`

export default function ({navigation}){

    const {data, error, loading} = useQuery(COHORTES)
    console.log(data?.cohortes?.length)
    
    {data?.cohortes?.map((cohorte)=>  console.log(cohorte.Number))}

    if(loading) return <Text> Loading...</Text>
    if(error) return <Text> ` Error ... ${error.message}`</Text>

    return(
        <ScrollView>
            {
                data?.cohortes?.map((cohorte) =>
                <ListItem key={cohorte.Number}>
                    <ListItem.Content>
                      <ListItem.Title> FT0{cohorte.Number} </ListItem.Title> 
                    </ListItem.Content>
                </ListItem>
                )
            }
        </ScrollView>
    )
}