import { Inter_700Bold, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Text, StyleSheet } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'
import { useFonts } from "expo-font";

import EditWorkout from './assets/screens/EditWorkout';
import Dashboard from './assets/screens/Dashboard';
import Workout from './assets/screens/Workout'

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
        />
        <Stack.Screen
          name="EditWorkout"
          component={EditWorkout}
        />
        <Stack.Screen
          name="Workout"
          component={Workout}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App