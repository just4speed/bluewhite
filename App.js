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
import ParkMe from "./screens/ParkMe";
import Map from "./screens/Map";
import Submit from "./screens/Submit";
// Redux
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from "./redux/store.js";
// Utils
import deviceStorage from './utils/storage';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const user = useSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logOut = () => {
    deviceStorage.signout();
    dispatch({ type: "LOG_OUT" });
    navigation.navigate("Login");
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      { user.isAuthorized && (
        <DrawerItem label="Log Out" onPress={logOut} />
      ) }
    </DrawerContentScrollView>
  );
}

const hideOptions = {
  drawerLabel: () => null,
  title: null,
  drawerIcon: () => null,
  drawerItemStyle: { height: 0 }
}

function DrawerNavigator() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    deviceStorage.init()
    .then(data => {
      dispatch({
        type: "LOGIN",
        payload: {
          user: data.user,
          token: data.token
        }
      });
    }).catch(e => {
      //
    })
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={"About"}
          drawerContent={props => <CustomDrawerContent {...props} />}
        >

          <Drawer.Screen
            name="Login"
            component={SignIn}
            options={user.isAuthorized && hideOptions}
          />

          <Drawer.Screen
            name="Register"
            component={SignUp}
            options={user.isAuthorized && hideOptions}
          />

          <Drawer.Screen
            name="About"
            component={About}
          />

          <Drawer.Screen
            name="ParkMe"
            component={ParkMe}
            options={!user.isAuthorized && hideOptions}
          />

          <Drawer.Screen
            name="Map"
            component={Map}
            options={hideOptions}
          />

          <Drawer.Screen
            name="Submit"
            component={Submit}
            options={!user.isAuthorized && hideOptions}
          />
          
        </Drawer.Navigator>
    </NavigationContainer>
    </View>
  );
}

export default function App(){
  return(
    <Provider store={store}>
      <DrawerNavigator/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp("5%"),
    flex: 1
  },
});
