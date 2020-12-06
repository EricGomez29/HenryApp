// Dependencia React
import React from 'react';
import store from "./Redux/Store/index.js";
import { Provider } from "react-redux";
//  Componentes
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


export default function App() {

    return (
  <Provider store={store}>
    <View style={styles.container}>
      <Text>Henry APP!</Text>
      <StatusBar style="auto" />
    </View>
  </Provider>
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
