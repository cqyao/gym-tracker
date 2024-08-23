import { View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Link, SplashScreen } from 'expo-router'
import { RFValue } from 'react-native-responsive-fontsize'
import React, { useEffect, useState } from 'react'
import QuickStart from '../components/QuickStart'
import {  useFonts, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter'
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([])
  const isFocused = useIsFocused();

  let [fontsLoaded] = useFonts({
    Inter_700Bold, Inter_500Medium
  });
  

  async function getWorkouts() {
    const db = await SQLite.openDatabaseAsync('GymRite')
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS workouts (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        workout_name TEXT NOT NULL,
        exercise_list TEXT NOT NULL,
        last_performed TEXT,
        has_been_performed INTEGER 
      );
    `);
    const allRows = await db.getAllAsync('SELECT * FROM workouts');
    setWorkouts(allRows);
    for (const row of allRows) {
      console.log(row)
    }
  }
  
  useEffect(() => {
    getWorkouts()
  }, [isFocused]);

  useEffect(() => {
    async function onLayoutRootView() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    onLayoutRootView();
  }, [fontsLoaded])


  if (!fontsLoaded) {
    console.log("Fonts not loaded!");
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeHeader}>Welcome, User</Text>
      {/* Progress Section*/}
      <Text style={styles.sectionHeader}>Progress</Text>
      <View style={styles.progressContainer}>
      </View>

      {/* Quick start workouts section */}
      <Text style={styles.sectionHeader}>Workouts</Text>
      <ScrollView style={{maxHeight: RFValue(180)}}>
        {workouts && workouts.length > 0 && workouts.map((workout)=> {
          return (
            <TouchableOpacity key={workout.id} onLongPress={()=>{Alert.alert('Delete this workout?')}}>
              <QuickStart workout={workout} onRefresh={getWorkouts}/>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
        <Link href='./addworkout' asChild>
          <Pressable style={styles.addBtn}>
            <Text style={styles.addBtnText}>Add Workout</Text>
          </Pressable>
        </Link>
  

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RFValue(30),
    paddingVertical: RFValue(70),
    //backgroundColor: "blue",
  },
  welcomeHeader: {
    fontFamily: "Inter_700Bold",
    fontSize: RFValue(20),
  },
  sectionHeader: {
    fontFamily: "Inter_700Bold",
    fontSize: RFValue(15),
    paddingTop: RFValue(30),
    paddingBottom: RFValue(8),
    marginLeft: RFValue(5),
  },
  progressContainer: {
    backgroundColor: "white",
    height: RFValue(200),
    width: "100%",
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 1,  
    // For Android phones
    elevation: 5
  },
  addBtn: {
    backgroundColor: "black",
    width: "60%",
    borderRadius: 10,
    height: RFValue(30),
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10),
    alignSelf: "center",
  },
  addBtnText: {
    color: "white",
    fontFamily: "Inter_500Medium",
    fontSize: RFValue(14),
  },
  
})


export default Dashboard;