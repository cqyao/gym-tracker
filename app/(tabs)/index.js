import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Link, SplashScreen } from 'expo-router'
import { RFValue } from 'react-native-responsive-fontsize'
import React, { useEffect, useState } from 'react'
import QuickStart from '../../components/QuickStart'
import {  useFonts, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter'
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';
import { CartesianChart, Line } from "victory-native";
import { Dropdown } from 'react-native-element-dropdown';
import { useFont } from '@shopify/react-native-skia';
import { Button } from 'react-native-paper'

SplashScreen.preventAutoHideAsync();

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const isFocused = useIsFocused();
  const [exercises, setExercises] = useState([]);
  const [value, setValue] = useState(null);
  const [exerciseNames, setExerciseNames] = useState([]);
  const [max, setMax] = useState([]);
  const [date, setDate] = useState([]);
  const font = useFont(Inter_500Medium, 12)

  let [fontsLoaded] = useFonts({
    Inter_700Bold, Inter_500Medium
  });

  const DATA = max.length > 0 && date.length > 0 ? 
  Array.from({ length: max.length }, (_, i) => ({
    max: max[i], // Fallback to 0 if max[i] is undefined
    date: date[i] // Fallback to an empty string if date[i] is undefined
  })) 
  : [];

  async function getMax(name) {
    try {
      const db = await SQLite.openDatabaseAsync('GymRite');
      const allRows = await db.getAllAsync('SELECT max, date FROM exercise_history WHERE name = ?', [name]);
      
      if (allRows && allRows.length > 0) {
        const maxValues = allRows.map(row => row.max);
        const maxDates = allRows.map(row => row.date);
        setDate(maxDates);
        setMax(maxValues);
      } else {
        setDate([]);
        setMax([]);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }
  
  async function getExercises() {
    const db = await SQLite.openDatabaseAsync('GymRite')
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS exercises (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          exercise_name TEXT NOT NULL,
          type TEXT,
          current_PR TEXT
          );
    `)
    const allRows = await db.getAllAsync('SELECT * FROM exercises');
    setExercises(allRows);
    const names = allRows.map((row) => ({ label: row.exercise_name, value: row.exercise_name }));
    setExerciseNames(names);

  }

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
    // for (const row of allRows) {
    //   console.log(row)
    // }
  }
  
  useEffect(() => {
    getWorkouts();
    getExercises();
    //console.log(exercises[0].exercise_name)
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
        <Dropdown 
          style={styles.dropdown} 
          placeholder='Select Exercise'
          placeholderStyle={styles.dropdownText}
          data={exerciseNames}
          labelField="label"
          valueField="value"
          onChange={(item) => {
            setValue(item.value);
            getMax(item.value);
          }}
        />
        {DATA.length > 0 ? (
        <CartesianChart 
          data={DATA} 
          xKey="date" 
          yKeys={["max"]}
          domainPadding={{ left: 20, right: 20, top: 10 }}
          domain={{y: [0]}}
          axisOptions={{ 
            font,
            formatXLabel(value) {
              const date = new Date(value)
              return isNaN(date.getTime()) ? "" : date.toLocaleString("default", { month: "short", day: "numeric" });
            },
          }}
        >
          {({ points, chartBounds }) => (
            <Line chartBounds={chartBounds} points={points.max} color="#818AAE" strokeWidth={2} strokeJoin="round" strokeCap="square"/>
          )}
        </CartesianChart>
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}
      </View>

      {/* Quick start workouts section */}
      <Text style={styles.sectionHeader}>Workouts</Text>
      <ScrollView style={{maxHeight: RFValue(120)}}>
        {workouts && workouts.length > 0 && workouts.map((workout)=> {
          return (
            <TouchableOpacity key={workout.id}>
              <QuickStart workout={workout} onRefresh={getWorkouts}/>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
        <Link href='./addworkout' asChild>
          <Button
            mode="contained"
            style={styles.addBtn}
          >
            Add Workout
          </Button>
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
    padding: 10,
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
  dropdown: {
    padding: 5,
    width: "80%",
    borderBottomColor: 'gray',
  },
  dropdownText: {
    fontFamily: "Inter_500Medium",
    fontSize: RFValue(9),
    color: "black"
  },
  noDataText: {
    alignSelf: "center",
    paddingTop: 80,
    fontSize: RFValue(15),
    color: "grey",
  }
  
})


export default Dashboard;