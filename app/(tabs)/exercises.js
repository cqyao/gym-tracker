import { View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { RFValue } from 'react-native-responsive-fontsize'
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-element-dropdown';
import { Button, TextInput, Text, Divider } from 'react-native-paper';

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
  const [exerciseName, setExerciseName] = useState('');
  const [isExerciseModal, setIsExerciseModal] = useState(false);
  const handleExerciseModal = () => setIsExerciseModal(() => !isExerciseModal);
  // This passes the exercise name to the modal so it displays on tap.
  const [exerciseModalName, setModalName] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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

  async function handleModal(name) {
    handleExerciseModal();
    setModalName(name)
    console.log(exerciseModalName)
  }

  useEffect(() => {
    getExercises();
  }, [exercises])


  return (
      <View style={styles.container}>
        <Text style={styles.welcomeHeader}>Exercises</Text>
        <View style={styles.buttonContainer}>
          <Button style={styles.addBtn} icon="plus" onPress={handleAddExerciseModal}>
            <Text variant='labelLarge'>Add</Text>
          </Button>
          {exercises.map((exercise) => {
          return (
            <View key={exercise.id} style={styles.exerciseContainer}>
              <Pressable onPress={()=>handleModal(exercise.exercise_name)}>
                <Text style={{ color: "#6750A4"}}>{exercise.exercise_name}</Text>
                <Text variant='bodySmall' style={{ color: "grey" }}>({exercise.type})</Text>
              </Pressable>
            </View>
          )
        })}
        </View>
        <Modal isVisible={isExerciseModal} >
          <View style={styles.exerciseModal}>
            <View style={{ flex: 1, marginTop: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pressable onPress={handleExerciseModal}>
                <AntDesign name="closesquare" size="25"/>
              </Pressable>
              <Text variant='titleMedium'>{exerciseModalName}</Text>
              {/* Still working on how to manage exercise deletion. Should it just be hidden? How does it affect workouts? */}
              <Pressable onPress={() => { delExercises(exerciseModalName); handleExerciseModal() }}>
                <Text variant="labelLarge" style={{ color: "#6750A4" }}>Delete</Text>
              </Pressable>
            </View>
            <View style={{ flex: 8, backgroundColor: "blue" }}>

            </View>
            
          </View>
        </Modal>
        
        {/* Add exercise modal */}
        <Modal isVisible={isAddCustomModalVisible} >
          <View style={styles.addModal}>
            <View style={{ flex: 1, marginTop: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pressable onPress={handleAddExerciseModal}>
                <AntDesign name="closesquare" size="25" />
              </Pressable>
              <Text variant='titleMedium'>
                Add exercise
              </Text>
              <Pressable onPress={()=> addExercise()}>
                <Text variant="labelLarge" style={{ color: "#6750A4" }}>Save</Text>
              </Pressable>
            </View>
            <View style={{ flex: 2 }}>
              <TextInput 
                style={styles.exerciseInput}
                mode='outlined'
                label="Exercise name"
                value={exerciseName}
                onChangeText={text => setExerciseName(text)}
                dense={true}
              />
              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
              <Text style={styles.category}>Category</Text>
              <Dropdown
                style={styles.dropdown}
                placeholder='None'
                placeholderStyle={styles.dropdownText}
                data={exercisesCategory}
                labelField="label"
                valueField="value"
                onChange={item => {
                  setValue(item.label);
                  setIsFocus(false);
                }}
              />
            </View>
            </View>
          </View>
          
        </Modal>
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
    width: "100%",
    marginBottom: 10,
    height: 50,
    paddingLeft: 20,
    justifyContent: "center",
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    //backgroundColor: 'red', 
    height: "80%",
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  addBtn: {
    height: 40,
    justifyContent: 'center'
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
  },
  // For the modal
  cancelBtn: {
    marginTop: 5,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelBtnText: {
    color: "black",
    fontSize: RFValue(13),
    fontFamily: "Inter_500Medium",
  },
  addModal: {
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 20,
    height: RFValue(180),
    width: "90%",
  },
  exerciseInput: {
    backgroundColor: "#ECECEC",
    height: RFValue(25),
    width: "100%",
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  dropdown: {
    paddingVertical: 10,
    width: "60%",
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  dropdownText: {
    fontFamily: "Inter_500Medium",
    fontSize: RFValue(12),
  },
  category: {
    fontFamily: "Inter_500Medium",
    paddingVertical: 15,
    fontSize: RFValue(12),
  },
  exerciseModal: {
    height: 500,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 30,
  }
  
})