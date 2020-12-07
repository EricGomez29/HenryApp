
import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import store from "./Redux/Store/index.js";
// import {Provider} from "react-redux";
// import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './src/Components/Register'
import Login from './screens/SignInScreen';
import Home from './screens/HomeScreen';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

export default function App() {

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

fontSize: [10, 20, 30]

