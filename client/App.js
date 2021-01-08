import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from '@apollo/client';
import { DripsyProvider } from 'dripsy';

import {GET_USER} from './apollo/user';

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
import { Admin } from './screens/Admin';
import AgregarStand from './screens/AgregarStandUp';
import DateTimePicker from './screens/DateTimePicker';
import CompareCode from './screens/CompareCode';
import ChangeOnlyPassword from './screens/ChangeOnlyPassword';
import AddUserStand from './screens/AddUserStand';
import StudentsList from './screens/StudentsList';
import Particles from './screens/Particles';
import ProfileUser from './screens/ProfileUser';
import CreateUserCohorte from './screens/CreateUserCohorte';
import Compañeros from './screens/Compañeros';
import InstructorProfile from './screens/InstructorProfile';
import RolesList from './screens/RolesList';
import SalaDeMesaNew from './screens/SalaDeMesaNew';
import InviteUsers from './screens/InviteUsers';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const client = new ApolloClient({
  uri: `http://localhost:5000/graphql`,
  cache: new InMemoryCache,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }//debugging graphql
});


function StackList() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CohorteList" component={CohorteList} />
      <Stack.Screen name="PruebaBoton" component={IniciaryRegistrar} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="PhotoProfile" component={PhotoProfile} />
      <Stack.Screen name="PairProgramming" component={PairProgramming} />
      <Stack.Screen name="StandUp" component={StandUp} />
      <Stack.Screen name="AgregarStandUp" component={AgregarStand} />
      <Stack.Screen name="DateTimePicker" component={DateTimePicker} />
      <Stack.Screen name="ChangeOnlyPassword" component={ChangeOnlyPassword} />
      <Stack.Screen name="CompareCode" component={CompareCode} />
      <Stack.Screen name="AddUserStand" component={AddUserStand} />
      <Stack.Screen name="StudentsList" component={StudentsList} />
      <Stack.Screen name="Particles" component={Particles} />
      <Stack.Screen name="ProfileUser" component={ProfileUser} />
      <Stack.Screen name="CreateUserCohorte" component={CreateUserCohorte} />
      <Stack.Screen name="RolesList" component={RolesList} />
      <Stack.Screen name="SalaDeMesaNew" component={SalaDeMesaNew} />
      <Stack.Screen name="InviteUsers" component={InviteUsers} />
    </Stack.Navigator>
  )
}



export default function App() {
  return (
    <ApolloProvider client={client}>
      <DripsyProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator 
            screenOptions={{ headerShown: false }}
            drawerStyle={{
              backgroundColor: '#fff080'
            }}
            drawerContentOptions={{
              activeBackgroundColor: 'white'
            }}
          >
            <Drawer.Screen name="<" component={StackList} />
            <Stack.Screen name="Inicio" component={Welcome} />
            {/* {Administrador()} */}
            <Drawer.Screen name='Admin' component={Admin} />
            <Drawer.Screen name='Ver Compañeros' component={Compañeros} />
            <Drawer.Screen name='Instructor del cohorte' component={InstructorProfile} />

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