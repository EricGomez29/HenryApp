import {gql, useQuery} from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

export default function Home({navigation}){
    const variable = "Acuña"
    const GET_USERS = gql`
      query users($lastName: String ) {
          users( where: {lastName: $lastName}) {
              username
          }
      }
    `
    const { data } = useQuery(GET_USERS, {
        variables: { lastName: "Acuña" }
    });
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.boton} onPress={() => {
                navigation.navigate('Login')
                console.log(data)
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Comenzar</Text>
            </TouchableOpacity>
        </View>
    )
}

//estilo

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    boton: {
        width: 200,
        height: 50,
        backgroundColor: 'yellow',
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        
    }
  });
