import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
//import store from "./Redux/Store/index.js";
//import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './screens/Register'
import Login from './screens/Login';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import ForgotPassword from './screens/ForgotPassword';
<<<<<<< HEAD
import Profile from './screens/Profile';

import { ApolloClient, InMemoryCache, gql, ApolloProvider } from '@apollo/client';
=======
import Footer from './Components/Footer'
import { ApolloClient, InMemoryCache, gql ,ApolloProvider} from '@apollo/client';
import dotenv from 'dotenv';
dotenv.config();

>>>>>>> 2f951741da6d96b7620644385c2120b32422816b

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: `${process.env.FRONT_PORT}/graphql`,
  cache: new InMemoryCache()
})



export default function App() {

  return (
<<<<<<< HEAD
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
=======
   <ApolloProvider client={client}> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={ { headerShown: false } }>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="Footer" component={Footer}/>
        
      </Stack.Navigator>
     

    </NavigationContainer>
   </ApolloProvider>
>>>>>>> 2f951741da6d96b7620644385c2120b32422816b
  );
}
