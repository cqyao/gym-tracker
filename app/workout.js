import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef, } from 'react'
import StopwatchTimer, {
  StopwatchTimerMethods,
} from 'react-native-animated-stopwatch-timer';
import Exercise from '../components/Exercise';
import { Entypo, } from '@expo/vector-icons'
import { useLocalSearchParams, router, Link } from 'expo-router';
import { RFValue } from 'react-native-responsive-fontsize'
import * as SQLite from 'expo-sqlite'


const workout = () => {
  const stopwatchTimerRef = useRef(null);
  const { workoutName, exerciseList, workoutId } = useLocalSearchParams();
  const [exerciseData, setExerciseData] = useState([]);
  const exercise_list = JSON.parse(exerciseList);
  const currentDate = new Date();

  const onScreenLoad = () => {
    stopwatchTimerRef.current?.play();
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    onScreenLoad();
  }, []);

  const handleExerciseUpdate = (updatedExercise) => {
    setExerciseData((prevData) => {
      const updatedData = [...prevData];
      updatedData[updatedExercise.index] = updatedExercise;
      return updatedData;
    });
  };

  async function finishWorkout() {
    try {
      const db = await SQLite.openDatabaseAsync('GymRite')
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS workout_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          workout_name TEXT NOT NULL,
          date TEXT NOT NULL,
          exercise_details TEXT 
        )
      `)
      await db.runAsync(
        'INSERT INTO workout_history (workout_name, date, exercise_details) VALUES (?,?,?)',
        [workoutName, currentDate.toISOString(), JSON.stringify(exerciseData)]
      )
    } catch (error) { console.log("Error creating workout history table: ", error)}
    router.back();
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
          <Text style={styles.workoutName}>{workoutName}</Text>
          <Pressable onPress={goBack}>
            <Entypo name="squared-cross" size={28} color="#805281" />
          </Pressable>
        </View>
        <StopwatchTimer ref={stopwatchTimerRef} containerStyle={styles.timerContainer} trailingZeros={0} />
      </View>
      <ScrollView>
        {exercise_list.map((exercise, index) => (
          <Exercise
            key={exercise.id}
            index={index}
            name={exercise.exercise_name}
            pr={exercise.current_PR}
            onExerciseUpdate={handleExerciseUpdate}
          />
        ))}
      </ScrollView>
      <TouchableOpacity onPress={finishWorkout} style={styles.finishBtn}>
        <Text style={styles.finishText}>Finish workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
    paddingHorizontal: 30,
  }, 
  workoutDetails: {

  },
  workoutName: {
    fontSize: 28,
    fontWeight: "bold",
  },
  timerContainer: {
    height: 30,
  },
  finishBtn: {
    backgroundColor: "black",
    width: "60%",
    borderRadius: 10,
    height: RFValue(25),
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(10),
    alignSelf: "center",
  },
  finishText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  }
})

export default workout