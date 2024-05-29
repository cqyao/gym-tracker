import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import CheckBox from 'expo-checkbox';
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { RFValue } from "react-native-responsive-fontsize";
import Exercise from '../../Components/Exercise';
import Modal from "react-native-modal";

const exercisesData = [
  { id: 1, name: 'Bench Press', type: 'Barbell' },
  { id: 2, name: 'Hack Squat', type: 'Machine' },
  { id: 3, name: 'Preacher Curl', type: 'Barbell' },
  { id: 4, name: 'Reverse Pec Fly', type: 'Machine' },
  { id: 5, name: 'Standing Calf Raise', type: 'Machine' },
];

const EditWorkout = () => {
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const toggleExerciseSelection = (exerciseId) => {
    setSelectedExercises((prevSelectedExercises) => ({
      ...prevSelectedExercises,
      [exerciseId]: !prevSelectedExercises[exerciseId],
    }));
  };

  const addSelectedExercises = () => {
    const newExercises = Object.keys(selectedExercises)
      .filter((key) => selectedExercises[key])
      .map((key) => {
        const exercise = exercisesData.find((ex) => ex.id.toString() === key);
        return { ...exercise, key: exerciseList.length + key };
      });
    setExerciseList([...exerciseList, ...newExercises]);
    setSelectedExercises({});
    handleModal();
  };

  // Functions
  const addExercise = event => {
    setExerciseList([...exerciseList, { key: exerciseList.length }])
  };
  const deleteExercise = (index) => {
    setExerciseList(exerciseList.filter((_, idx) => idx !== index));
  };
  const saveWorkout = () => {
    console.log(exerciseList)
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.workoutNameHeader} 
        placeholder='Name'
      />
      <ScrollView>
        {exerciseList.map((exercise, index) => (
          <Exercise key={exercise.key} index={index} name={exercise.name} deleteExercise={deleteExercise} />
        ))}
      </ScrollView>
      <View style={styles.buttonsView}>
        <TouchableOpacity style={styles.addBtn} onPress={handleModal}>
          <Text style={{color: "white", fontSize: "15", fontFamily: "Inter_500Medium"}}>Add an exercise</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Exercise List</Text>
            <FlatList
              data={exercisesData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.exerciseItem}>
                  <CheckBox
                    style={{margin: 15}}
                    color={"black"}
                    value={selectedExercises[item.id] || false}
                    onValueChange={() => toggleExerciseSelection(item.id)}
                  />
                  <Text>{item.name}{"\n"}({item.type})</Text>
                </View>
              )}
            />
            <TouchableOpacity style={styles.addSelectedBtn} onPress={addSelectedExercises}>
              <Text style={styles.addSelectedBtnText}>Add selected ({Object.keys(selectedExercises).filter((key) => selectedExercises[key]).length})</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleModal}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
    modalContent: {
      flex: 1,
      backgroundColor: "#F9F9F9",
      borderRadius: 10,
      padding: 30,
      marginHorizontal: 20,
      marginTop: 60,
      marginBottom: 95,
    },
    modalHeader: {
      fontSize: RFValue(20),
      fontFamily: "Inter_700Bold",
      marginBottom: 10,
    },
    exerciseItem: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: 10,
      backgroundColor: "white",
      borderRadius: 10,
      height: RFValue(50),
      width: "95%",
      shadowColor: 'grey',
      shadowOffset: { width: 2, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 1,  
      // For Android phones
      elevation: 5
    },
    addSelectedBtn: {
      marginTop: 20,
      marginHorizontal: 25,
      padding: 10,
      backgroundColor: "#805281",
      borderRadius: 10,
      alignItems: "center",
    },
    addSelectedBtnText: {
      color: "white",
      fontSize: RFValue(14),
      fontFamily: "Inter_500Medium",
    },
    cancelBtn: {
      marginTop: 10,
      padding: 10,
      borderRadius: 8,
      alignItems: "center",
    },
    cancelBtnText: {
      color: "black",
      fontSize: RFValue(13),
      fontFamily: "Inter_500Medium",
    },
});

export default EditWorkout