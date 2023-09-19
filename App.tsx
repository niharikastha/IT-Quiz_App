import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Welcome from './src/screens/Welcome'
import Login from './src/screens/Login'
import Signup from './src/screens/Signup'
import Homepage from './src/screens/Homepage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="welcome" component={Welcome} 
          options={
            {headerShown : false}
          } 
        />
        <Stack.Screen name="login" component={Login} 
         options={
          {headerShown : false}
        } 
        />
        <Stack.Screen name="signup" component={Signup} 
         options={
          {headerShown : false}
        } 
        />
        <Stack.Screen name="homepage" component={Homepage} 
         options={
          {headerShown : false}
        } 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  }
})