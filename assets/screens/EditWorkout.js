import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Exercise from '../../Components/Exercise';
import { TouchableOpacity } from 'react-native';
import ReactDOM from "react-dom";

const EditWorkout = () => {
  const [exerciseList, setExerciseList] = useState([<Exercise key={0} index={0} deleteExercise={deleteExercise} />, <Exercise key={1} index={1} deleteExercise={deleteExercise} />,<Exercise key={2} index={2} deleteExercise={deleteExercise} />]);

  // Functions
  const addExercise = event => {
    setExerciseList([...exerciseList, { key: exerciseList.length }])
  };
  const deleteExercise = (index) => {
    setExerciseList(exerciseList.filter((_, idx) => idx !== index));
  };
  const saveWorkout = () => {
    console.log("Workout saved.")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.workoutNameHeader}>Name</Text>
      <ScrollView>
        {exerciseList.map((exercise, index) => (
          <Exercise key={exercise.key} index={index} deleteExercise={deleteExercise} />
        ))}
      </ScrollView>
      <View style={styles.buttonsView}>
        <TouchableOpacity style={styles.addBtn} onPress={addExercise}>
          <Text style={{color: "white", fontSize: "15", fontFamily: "Inter_500Medium"}}>Add an exercise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={saveWorkout}>
          <Text style={{color: "white", fontSize: "20", fontFamily: "Inter_700Bold"}}>Save</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
};


const styles = StyleSheet.create({
    container: {
        flex: 5,
        paddingHorizontal: RFValue(30),
        paddingVertical: RFValue(70),
        //backgroundColor: "blue",
    },
    workoutNameHeader: {
        fontFamily: "Inter_700Bold",
        fontSize: "30",
        marginLeft: 10,
    },
    buttonsView: {
      flex: 1,
      height: RFValue(50),
      width: "100%",
      alignItems: "center",
      alignSelf: "center",
      position: "absolute",
      bottom: 90
    },
    addBtn: {
      width: "60%",
      height: RFValue(35),
      backgroundColor: "#000000",
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      margin: 7,
    },
    saveBtn: {
      width: "80%",
      height: RFValue(40),
      backgroundColor: "#7F5180",
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      margin: 6,
    },
});

export default EditWorkout