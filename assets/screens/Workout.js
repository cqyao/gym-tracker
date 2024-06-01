import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { RFValue } from "react-native-responsive-fontsize";
import Exercise from '../../Components/Exercise';
import { updateLastPerformed } from '../../supabase';

const Workout = ({ navigation, route }) => {
  const workout = route.params;
  const [ exerciseList, setExerciseList ] = useState([])
  const currentDate = new Date();
  // Functions
  useEffect(() => {
    setExerciseList(workout.workout.exercise_list)
  },[])

  const finish = () => {
    updateLastPerformed(workout.workout.id, currentDate)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.workoutNameHeader}>{workout.workout.workout_name}</Text>
      {exerciseList.map((exercise) => {
        return (
          <Exercise name={exercise.exercise_name} key={exercise.id} currentPR={exercise.current_PR}/>
        )
      })}
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.finishBtn} onPress={finish}>
          <Text style={styles.finishBtnText}>Finish</Text>
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
    btnView: {
      alignItems: "center",
      alignSelf: "center",
      position: "absolute",
      bottom: 90,
      width: "100%",
    },
    finishBtn: {
      backgroundColor: "#805281",
      alignItems: "center",
      borderRadius: 10,
      paddingHorizontal: RFValue(20),
      paddingVertical: RFValue(10),
      width: "70%",
    },
    finishBtnText: {
      fontFamily: "Inter_500Medium",
      fontSize: RFValue(15),
      color: "white",
    }
});

export default Workout