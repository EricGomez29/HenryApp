import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MaterialIconTextButtonsFooter2 from "./MaterialIconTextButtonsFooter2";

function Footer({navigation}) {
  return (
    <View style={styles.container}>
      <MaterialIconTextButtonsFooter2
        style={styles.materialIconTextButtonsFooter2}
        navigation={navigation}
      ></MaterialIconTextButtonsFooter2>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 5,
    bottom: 0,
    marginTop: 2
  },
  materialIconTextButtonsFooter2: {
    height: 56,
    width: 375
  }
});

export default Footer;
