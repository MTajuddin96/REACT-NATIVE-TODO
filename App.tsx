import React from 'react'
import { View, Text } from 'react-native'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './src/Navigator/Routes';


export default function App() {
  return (
    <Routes />
  )
}
