import 'react-native-gesture-handler';
//import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import store from "./Redux/Store/index.js";
//import { Provider } from "react-redux";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/Components/Register'
import Login from './screens/SignInScreen';
import Home from './screens/HomeScreen';
import { ApolloClient, InMemoryCache, gql ,ApolloProvider} from '@apollo/client';

const Stack = createStackNavigator(  );

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
});

export default function App() {
  

  return (
   <ApolloProvider client={client}> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={ { headerShown: false } }>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Welcome" component={Welcome}/>
      </Stack.Navigator>
    </NavigationContainer>
   </ApolloProvider>
  );
}