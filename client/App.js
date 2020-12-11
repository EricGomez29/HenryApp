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
import UsersList from './screens/UsersList'
import CohorteList from './screens/CohorteList'
import Footer from './Components/Footer'
import { ApolloClient, InMemoryCache, gql ,ApolloProvider} from '@apollo/client';
import dotenv from 'dotenv';
dotenv.config();


const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: `http://localhost:5000/graphql`,
  cache: new InMemoryCache()
})



export default function App() {
  
  return (
   <ApolloProvider client={client}> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='CohorteList' screenOptions={ { headerShown: false } }>
        <Stack.Screen name="CohorteList" component={CohorteList} />
        <Stack.Screen name="UsersList" component={UsersList}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="Footer" component={Footer}/>
        
      </Stack.Navigator>
     

    </NavigationContainer>
   </ApolloProvider>
  );
}
