import React from 'react'
import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login, Todo } from '../Screens';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login'>
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="todo" component={Todo} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
