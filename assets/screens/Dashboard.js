import { View, Text, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import QuickStart from '../../Components/QuickStart'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { getWorkouts } from '../../supabase'

const Dashboard = ({ navigation }) => {
  const [workouts, setWorkouts] = useState([]);
  const isFocused = useIsFocused();

  const getWorkoutsList = async() => {
    const workoutsList = await getWorkouts();
    setWorkouts(workoutsList)
  };

  useEffect(() => {
    if (isFocused) {
      getWorkoutsList();
    } else {
      console.log("Not focused")
    }
  },[isFocused]);

  const navEditWorkout = () => {
    navigation.navigate("EditWorkout")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeHeader}>Welcome, User_1</Text>
      {/* Progress section */}
      <Text style={styles.sectionHeader}>Progress</Text>
      <View style={styles.progressContainer}>

      </View>
      {/* Quick start workouts section */}
      <Text style={styles.sectionHeader}>Workouts</Text>
      <ScrollView style={{maxHeight: RFValue(180)}}>
      {workouts.map((workout) => {
        return (
          <QuickStart key={workout.id} navigation={navigation} workout={workout}/>
        )
      })}
      </ScrollView>
      <TouchableOpacity style={styles.addBtn} onPress={navEditWorkout}>
        <Text style={styles.addBtnText}>Add Workout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: RFValue(30),
      paddingVertical: RFValue(70),
      //backgroundColor: "blue",
    },
    welcomeHeader: {
      fontFamily: "Inter_700Bold",
      fontSize: RFValue(20),
    },
    sectionHeader: {
      fontFamily: "Inter_700Bold",
      fontSize: RFValue(15),
      paddingTop: RFValue(30),
      paddingBottom: RFValue(8),
      marginLeft: RFValue(5),
    },
    progressContainer: {
      backgroundColor: "white",
      height: RFValue(200),
      width: "100%",
      borderRadius: 10,
      shadowColor: 'grey',
      shadowOffset: { width: 2, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 1,  
      // For Android phones
      elevation: 5
    },
    addBtn: {
      backgroundColor: "black",
      width: "60%",
      borderRadius: 10,
      height: RFValue(30),
      justifyContent: "center",
      alignItems: "center",
      margin: RFValue(10),
      alignSelf: "center",
    },
    addBtnText: {
      color: "white",
      fontFamily: "Inter_500Medium",
      fontSize: RFValue(14),
    },
    
})

export default Dashboard