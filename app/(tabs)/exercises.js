import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { RFValue } from 'react-native-responsive-fontsize'
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-element-dropdown';

const exercisesCategory = [
  { label: 'Barbell', value: '1' },
  { label: 'Dumbbell', value: '2' },
  { label: 'Machine', value: '3' },
  { label: 'Weighted Bodyweight', value: '4' },
  { label: 'Assisted Bodyweight', value: '5' },
  { label: 'Cardio', value: '6' }
]

const exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [isAddCustomModalVisible, setIsAddCustomModalVisible] = useState(false);
  const [customExercise, setCustomExercise] = useState("")
  const handleAddExerciseModal = () => setIsAddCustomModalVisible(() => !isAddCustomModalVisible);

  async function getExercises() {
    const db = await SQLite.openDatabaseAsync('GymRite')
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS exercises (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          exercise_name TEXT NOT NULL,
          type TEXT
          );
    `)
    const allRows = await db.getAllAsync('SELECT * FROM exercises');
    setExercises(allRows);
  }

  async function delExercises(name) {
    const db = await SQLite.openDatabaseAsync('GymRite')
    await db.runAsync('DELETE FROM exercises WHERE exercise_name = $value', {$value: name})
  }

  async function addExercise() {
    const db = await SQLite.openDatabaseAsync('GymRite')
    await db.runAsync('INSERT INTO exercises (exercise_name, type) VALUES (?, ?)'), 
    []
  }

  useEffect(() => {
    getExercises();
  }, [exercises])


  return (
      <View style={styles.container}>
        <Text style={styles.welcomeHeader}>Exercises</Text>
        <View>
          <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={handleAddExerciseModal}>
            <FontAwesome5 name="plus" size={16} color="black" />
            <Text style={[{marginLeft: 5}, styles.h1]}>Add</Text>
          </Pressable>
        </View>
        <Modal isVisible={isAddCustomModalVisible}>
          
        </Modal>
        
        {exercises.map((exercise) => {
          return (
            <View key={exercise.id} style={styles.exerciseContainer}>
              <Text style={styles.h1}>{exercise.exercise_name}</Text>
              <Text style={styles.h2}>{exercise.type}</Text>
              <Pressable onPress={()=>delExercises(exercise.exercise_name)}>
                <Text>Delete</Text>
              </Pressable>
            </View>
          )
        })}
    </View>
  )
}

export default exercises

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RFValue(30),
    paddingVertical: RFValue(70),
    //backgroundColor: "blue",
  },
  exerciseContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
  },
  welcomeHeader: {
    fontFamily: "Inter_700Bold",
    fontSize: RFValue(20),
    marginBottom: 50,
  },
  h1: {
    fontSize: RFValue(12),
    fontFamily: "Inter_700Bold"
  },
  h2: {
    fontSize: RFValue(10),
    fontFamily: "Inter_500Medium",
  }
})