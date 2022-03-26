import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { StatusBar, StyleSheet, Text, Touchable, ActivityIndicator, View } from 'react-native'
import React, {useState, useEffect} from 'react';
import AuthNavigator from './auth-navigation';
import AppNavigator from './app-navigation';
import app from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";



class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this.login();

    this._isMounted = false;
  }

  componentWillUnmount() {
    this._isMounted = false;
 }

  login = () => {
    onAuthStateChanged(getAuth(app), (user) => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }
  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex: 1,
        alignItems: 'center',
        justifyContent: 'center',}}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthNavigator,
    App:AppNavigator
      // <Provider store={store}>
      //   <AppNavigator />
      // </Provider> 
  },
  {
    initialRouteName: 'AuthLoading'
  },
);

export default createAppContainer(RootNavigator);
