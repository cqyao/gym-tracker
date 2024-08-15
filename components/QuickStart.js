import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Ionicons } from '@expo/vector-icons';
import { differenceInDays } from 'date-fns';
import { router } from 'expo-router';
import { supabase } from '@/utils/supabase';

const QuickStart = ({workout}) => {
  const currentDate = new Date();
  const [lastPerformed, setLastPerformed] = useState(null);
  
  async function updateDate() {
    const { error } = await supabase
      .from('Workouts')
      .update({ last_performed: currentDate })
      .eq('id', workout.id)
    if (error) {console.log(error.message)}
  }
  const startWorkout = () => {
    router.push({
      pathname: "./workout",
      params: {
        workoutName: workout.workout_name, 
        workoutId: workout.id,
        exerciseList: workout.exercise_list
      }
    })
    updateDate();
  };

  useEffect(() => {
    setLastPerformed(differenceInDays(currentDate, workout.last_performed));
  },[]);

  return (
    <View style={styles.quickStartContainer}>
      <View>
        <Text style={styles.exerciseName}>{workout.workout_name}</Text>
        <Text style={styles.lastPerformed}>Last performed: {lastPerformed} days ago</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
        <Ionicons name="play-outline" size="25" color="white"/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  quickStartContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "white",
      height: RFValue(50),
      width: "100%",
      paddingHorizontal: RFValue(15),
      paddingVertical: RFValue(7),
      marginVertical: RFValue(5),
      borderRadius: 10,
      shadowColor: 'grey',
      shadowOffset: { width: 2, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 1,  
      // For Android phones
      elevation: 5
    },
    exerciseName: {
      fontFamily: "Inter_500Medium",
      fontSize: RFValue(15),
    },
    lastPerformed: {
      color: "grey"
    },
    startButton: {
      backgroundColor: "#805281",
      borderRadius: 5,
      height: "100%",
      width: RFValue(30),
      justifyContent: "center",
      alignItems: "center"
    }
})

export default QuickStart