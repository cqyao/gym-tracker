import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Ionicons } from '@expo/vector-icons';
import { differenceInDays } from 'date-fns';
import { router } from 'expo-router';
import * as SQLite from 'expo-sqlite';

const QuickStart = ({workout, onRefresh}) => {
  const currentDate = new Date();
  const [lastPerformed, setLastPerformed] = useState(null);
  const [showDel, setShowDel] = useState(false);

  // Database
  
  async function updateDate() {
    try {
      const db = await SQLite.openDatabaseAsync('GymRite');
      await db.runAsync('UPDATE workouts SET last_performed = ? WHERE workout_name = ?', currentDate.toISOString(), workout.workout_name.toString());
      await db.runAsync('UPDATE workouts SET has_been_performed = ? WHERE workout_name = ?', 1, workout.workout_name.toString());
      onRefresh();
      console.log("Last performed: ", lastPerformed, workout.workout_name.toString());
    } catch (error) {
      console.log("Error in updating data: ", error);
    }
  }

  // Operation 

  const startWorkout = () => {
    router.push({
      pathname: "./workout",
      params: {
        workoutName: workout.workout_name, 
        workoutId: workout.id,
        exerciseList: workout.exercise_list
      }
    })
    setLastPerformed(differenceInDays(currentDate, workout.last_performed));
    updateDate();
  };

  async function delWorkout() {
    const db = await SQLite.openDatabaseAsync('GymRite');
    await db.runAsync('DELETE FROM workouts WHERE workout_name = $value', {$value: workout.workout_name})
    onRefresh();
  };

  // Toggles

  function toggleDel() {
    if (showDel === true) {
      setShowDel(false)
    } else if (showDel === false) {
      setShowDel(true)
    }
  }

  function ShowDel({ showDel }) {
    return (
      <View>
        {showDel ? (
          <TouchableOpacity style={styles.delButton} onPress={delWorkout}>
            <Ionicons name="trash-bin-outline" size={25} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
            <Ionicons name="play-outline" size={25} color="white" />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  function ToggleHistory({ performed }) {
    if (performed === 0) {
      return (
        <Text>Not performed yet!</Text>
      )
    } else {
      return (
        <Text style={styles.lastPerformed}>Last performed: {lastPerformed} days ago</Text>
      )
    }
  };

  return (
    <Pressable onLongPress={()=>toggleDel()}>
      <View style={styles.quickStartContainer}>
        <View>
          <Text style={styles.exerciseName}>{workout.workout_name}</Text>
          <ToggleHistory performed={workout.has_been_performed}/>
        </View>
        <ShowDel showDel={showDel}/>
        
      </View>
    </Pressable>
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
    },
    delButton: {
      backgroundColor: "#F2F2F2",
      borderRadius: 5,
      height: "100%",
      width: RFValue(30),
      justifyContent: "center",
      alignItems: "center"
    }
})

export default QuickStart