import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import store from "./Redux/Store/index.js";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './screens/Register'
import Login from './screens/Login';
import Home from './screens/Home';
import Welcome from './screens/Welcome';

const Stack = createStackNavigator(  );


export default function App() {

  return (
   <Provider store={store}> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={ { headerShown: false } }>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Welcome" component={Welcome}/>
      </Stack.Navigator>
    </NavigationContainer>
   </Provider>
  );
}

