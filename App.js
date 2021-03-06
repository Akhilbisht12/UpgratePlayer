import React from 'react';
import 'react-native-gesture-handler';
import {  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home'
import Player from './Screens/Player';
import Folder from './Screens/Folder';

const Stack = createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Player" component={Player} />
      <Stack.Screen name="Folder" component={Folder} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

