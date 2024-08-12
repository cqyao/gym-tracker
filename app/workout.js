import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect, useRef, } from 'react'
import StopwatchTimer, {
  StopwatchTimerMethods,
} from 'react-native-animated-stopwatch-timer';
import Exercise from '../components/Exercise';
import { Entypo, } from '@expo/vector-icons'
import { useLocalSearchParams, router } from 'expo-router';


const workout = () => {
  const stopwatchTimerRef = useRef();
  const { workoutName, exerciseList } = useLocalSearchParams();
  const exercise_list = JSON.parse(exerciseList)
  
  const onScreenLoad = () => {
    stopwatchTimerRef.current?.play()
  }
  const goBack = () => {
    router.back();
  }
  useEffect(() => {
    onScreenLoad();
  }, [])

  

  return (
    <View style={styles.container}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline"}}>
          <Text style={styles.workoutName}>{workoutName}</Text>
          <Pressable onPress={goBack}>
            <Entypo name="squared-cross" size={28} color="#805281" />
          </Pressable>
        </View>
        
        <StopwatchTimer ref={stopwatchTimerRef} containerStyle={styles.timerContainer} trailingZeros={0}/>
      </View>
      {/* Workouts */}
      <View>
        {exercise_list.map((exercise) => {
          return (
            <Exercise key={exercise.id} name={exercise.exercise_name} />
          )
        })}
      </View>
      
    </View>
  )
}

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