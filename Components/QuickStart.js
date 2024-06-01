import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { differenceInDays } from 'date-fns';


const QuickStart = ({navigation, workout}) => {
  const currentDate = new Date();
  const [lastPerformed, setLastPerformed] = useState(null);

  const startWorkout = () => {
    navigation.navigate("Workout", { workout });
    //console.log(currentDate)
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