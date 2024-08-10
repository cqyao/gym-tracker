import { View, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView } from 'react-native'
import { Link } from 'expo-router'
import { RFValue } from 'react-native-responsive-fontsize'
import React, { useEffect, useState } from 'react'
import QuickStart from '../components/QuickStart'
import { supabase } from '@/utils/supabase'

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([])
  async function getWorkouts() {
    const { data, error } = await supabase
      .from('Workouts')
      .select()

    setWorkouts(data)
  }
  useEffect(() => {
    getWorkouts()
  }, [workouts]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeHeader}>Welcome, User</Text>
      {/* Progress Section*/}
      <Text style={styles.sectionHeader}>Progress</Text>
      <View style={styles.progressContainer}>
      </View>

      {/* Quick start workouts section */}
      <Text style={styles.sectionHeader}>Workouts</Text>
      <ScrollView style={{maxHeight: RFValue(180)}}>
        {workouts.map((workout)=> {
          return (
            <QuickStart key={workout.id} workout={workout} />
          )
        })}
      </ScrollView>
      <Link href="./workout" asChild>
        <Pressable style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add Workout</Text>
        </Pressable>
      </Link>

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