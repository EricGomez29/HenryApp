import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { DripsyProvider } from 'dripsy';

//Screens
import Home from './screens/Home';
import Welcome from './screens/Welcome';
import ForgotPassword from './screens/ForgotPassword';
import CohorteList from './screens/CohorteList'
import Profile from './screens/Profile';
import ProfileEdit from './screens/ProfileEdit';
import StandUp from './screens/StandUp';
import IniciaryRegistrar from './screens/PruebaBoton';
import SalaDeMesa from './screens/SalaDeMesa';
import PhotoProfile from './screens/PhotoProfile';
import PairProgramming from './screens/PairProgramming';
import{Admin} from './screens/Admin';
import AgregarStand from './screens/AgregarStandUp';
import DateTimePicker from './screens/DateTimePicker';
import CompareCode from './screens/CompareCode';
import ChangeOnlyPassword from './screens/ChangeOnlyPassword';
import AddUserStand from './screens/AddUserStand';
import StudentsList from './screens/StudentsList';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const client = new ApolloClient({
  uri: `http://localhost:5000/graphql`,
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }//debugging graphql
});


function StackList (){
  return(
  <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="CohorteList" component={CohorteList} />
    <Stack.Screen name="PruebaBoton" component={IniciaryRegistrar} />
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
    <Stack.Screen name="SalaDeMesa" component={SalaDeMesa} />
    <Stack.Screen name="PhotoProfile" component={PhotoProfile} />
    <Stack.Screen name="PairProgramming" component={PairProgramming} />
    <Stack.Screen name="StandUp" component={StandUp} />
    <Stack.Screen name="AgregarStandUp" component={AgregarStand} />
    <Stack.Screen name="DateTimePicker" component={DateTimePicker} />
    <Stack.Screen name="ChangeOnlyPassword" component={ChangeOnlyPassword} />
    <Stack.Screen name="CompareCode" component={CompareCode} />
    <Stack.Screen name="AddUserStand" component={AddUserStand} />
    <Stack.Screen name="StudentsList" component={StudentsList} />
   </Stack.Navigator>
  )
}
export default function App() {
  return (
    <ApolloProvider client={client}>
      <DripsyProvider theme={theme}>
        <NavigationContainer>
        <Drawer.Navigator>
          {/* <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}> */}
            <Drawer.Screen name="<" component={StackList} />
            <Stack.Screen name="Inicio" component={Welcome} />
            <Drawer.Screen name='Admin' component={Admin}/>
          </Drawer.Navigator>
        </NavigationContainer>
      </DripsyProvider>
    </ApolloProvider>
  );
}

const theme = {
  colors: {
    primary: 'yellow'
  },

}