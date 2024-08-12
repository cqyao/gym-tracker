import { View, Text, StyleSheet, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef, } from 'react'
import StopwatchTimer, {
  StopwatchTimerMethods,
} from 'react-native-animated-stopwatch-timer';
import Exercise from '../components/Exercise';
import { Entypo, } from '@expo/vector-icons'
import { useLocalSearchParams, router, Link } from 'expo-router';
import { supabase } from '../utils/supabase'


const workout = () => {
  const stopwatchTimerRef = useRef(null);
  const { workoutName, exerciseList, workoutId } = useLocalSearchParams();
  const [exerciseData, setExerciseData] = useState([]);
  const exercise_list = JSON.parse(exerciseList);

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
    router.back();
    const { error } = await supabase
      .from('Workout History')
      .insert({
        workout_id: workoutId,
        exercise_details: exerciseData
      })
    if ( error ) {console.log(error.message)}
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
      <TouchableOpacity onPress={finishWorkout}>
        <Text>Finish workout</Text>
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
  }
})

export default workout