import React,{useState, useEffect} from 'react'
import {StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
//import USERS_LIST from '../Querys/UsersListQuery'
import {gql,useQuery} from '@apollo/client'
import UsersListItem from '../Components/UsersListItems'
import imagen from '../assets/images.jpg'
import { ScrollView } from 'react-native-gesture-handler';
import {ListItem, Avatar} from 'react-native-elements'




const USERS= gql`
query Users {
    users {
       
        firstName
        lastName
        cohorte
        username
        

    }
}`


export default function UsersList({navigation}){
    

    const {data, error, loading} = useQuery(USERS)
    
    {data?.users?.map((user)=>  console.log(user.firstName))}
    
    if(loading) return <Text> Loading...</Text>
    if(error) return <Text> ` Error ... ${error.message}`</Text>
    return(
        <ScrollView>
            <TextInput 
            style= {styles.searchBox}
            placeholder= 'Ingrese nombre de estudiante'
            onChangeText= {text => console.log(text)}
            />
            <View>
                 {data?.users?.map((user) => 
                     <ListItem   key={user.username}>
                         <ListItem.Chevron />
                         <Avatar source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9KvhGkbvb7hdNlrVCTBTUNv_KkO10JWu9xQ&usqp=CAU"}} 
                        rounded //redondea la imagen
                        />
                        <ListItem.Content>
                        <ListItem.Title>{user.firstName + ''} {user.lastName}</ListItem.Title>
                         <ListItem.Subtitle> {user.username}</ListItem.Subtitle>
            <ListItem.Subtitle>Cohorte: FT0{user.cohorte} </ListItem.Subtitle>
                        </ListItem.Content>
                
                    </ListItem>
                )} 
                <FlatList>
                    
                </FlatList>
            </View>
        </ScrollView>
    )

}

const styles= StyleSheet.create({
    container : {
        flex:1,
        marginTop: 30,
        alignItems: 'center',

    },
    searchBox: {
        width: '90%',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    containerItem: {
        flex:1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageView: {
        height: 20,
        width: 20,
        borderRadius: 20
    },
    name: {
        marginLeft: 12,
        fontSize: 18
    }
    
})