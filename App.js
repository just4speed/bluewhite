import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp, heightPercentageToDP as hp
} from "react-native-responsive-screen";
// Screens
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import About from "./screens/About";

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Login" component={SignIn} />
          <Drawer.Screen name="Register" component={SignUp} />
          <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp("5%"),
    flex: 1
  },
});
