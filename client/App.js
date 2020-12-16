import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import ForgotPassword from './screens/ForgotPassword';
import UsersList from './screens/UsersList'
import CohorteList from './screens/CohorteList'
import Footer from './Components/Footer'
import { ApolloClient, InMemoryCache, gql ,ApolloProvider} from '@apollo/client';
// import {Sala, MesaPrivada, CrearMesa, UnirseAMesa, Mesa} from './screens/Mesas';  //mesa privada
import {Mesa} from './screens/Mesas';
import IniciaryRegistrar from './screens/PruebaBoton'

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: `http://localhost:5000/graphql`,
  cache: new InMemoryCache()
})



export default function App() {
  
  return (
   <ApolloProvider client={client}> 
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' /*screenOptions={ { headerShown: false } }*/>
        <Stack.Screen name="CohorteList" component={CohorteList} />
        <Stack.Screen name="UsersList" component={UsersList}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="PruebaBoton" component={IniciaryRegistrar}/>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        {/* <Stack.Screen name="Sala" component={Sala}/>
        <Stack.Screen name="MesaPrivada" component={MesaPrivada}/>
        <Stack.Screen name="CrearMesa" component={CrearMesa}/>
        <Stack.Screen name="UnirseAMesa" component={UnirseAMesa}/> */}
        <Stack.Screen name="Mesa" component={Mesa}/>
        <Stack.Screen name="Footer" component={Footer}/>  
      </Stack.Navigator>
    </NavigationContainer>
   </ApolloProvider>
  );
}
