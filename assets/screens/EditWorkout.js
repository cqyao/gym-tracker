import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native'
import CheckBox from 'expo-checkbox';
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { RFValue } from "react-native-responsive-fontsize";
import Exercise from '../../Components/Exercise';
import Modal from "react-native-modal";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { getExercises, addExercise } from '../../supabase';

const exercisesCategory = [
  { label: 'Barbell', value: '1' },
  { label: 'Dumbbell', value: '2' },
  { label: 'Machine', value: '3' },
  { label: 'Weighted Bodyweight', value: '4' },
  { label: 'Assisted Bodyweight', value: '5' },
  { label: 'Cardio', value: '6' }
]

const EditWorkout = () => {
  const [exercisesData, setExercisesData] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState({});
  const [isAddExerciseModalVisible, setIsAddExerciseModalVisible] = useState(false);
  const [isAddCustomModalVisible, setIsAddCustomModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const getExerciseList = async() => {
    const exerciseList = await getExercises();
    setExercisesData(exerciseList);
    console.log(exercisesData)
  }
  
  useEffect(() => {
    getExerciseList();
  }, []);

  const [customExercise, setCustomExercise] = useState("");

  const handleAddExerciseModal = () => setIsAddExerciseModalVisible(() => !isAddExerciseModalVisible);
  const handleAddCustomModal = () => setIsAddCustomModalVisible(() => !isAddCustomModalVisible);

  // Functions
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
    handleAddExerciseModal();
  };

  const handleBoth = () => {
    if (isAddCustomModalVisible) {
      handleAddCustomModal();
      setTimeout(() => {
        handleAddExerciseModal();
      }, 400);
    } else {
      handleAddExerciseModal();
      setTimeout(() => {
        handleAddCustomModal();
      }, 400);
    }
  }
  const deleteExercise = (index) => {
    setExerciseList(exerciseList.filter((_, idx) => idx !== index));
  };
  const saveWorkout = () => {
    console.log(customExercise)
  };
  const saveCustomExercise = () => {
    addExercise(customExercise, value);
    getExerciseList();
  };

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
        <TouchableOpacity style={styles.addBtn} onPress={handleAddExerciseModal}>
          <Text style={{color: "white", fontSize: "15", fontFamily: "Inter_500Medium"}}>Add an exercise</Text>
        </TouchableOpacity>
        {/*First modal*/}
        <Modal isVisible={isAddExerciseModalVisible}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Exercise List</Text>
            <TouchableOpacity style={styles.addCustomBtn} onPress={handleBoth}>
              <Text style={styles.addCustomBtnText}>Add custom</Text>
            </TouchableOpacity>
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
                  <Text>{item.exercise_name}{"\n"}({item.type})</Text>
                </View>
              )}
            />
            <TouchableOpacity style={styles.addSelectedBtn} onPress={addSelectedExercises}>
              <Text style={styles.addSelectedBtnText}>Add selected ({Object.keys(selectedExercises).filter((key) => selectedExercises[key]).length})</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleAddExerciseModal}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* Second modal */}
        <Modal isVisible={isAddCustomModalVisible}>
          <View style={styles.modalCustomContent}>
            <View style={{flexDirection: "row", alignItems: "baseline", justifyContent: "space-between"}}>
              <TouchableOpacity onPress={handleBoth}>
                <AntDesign name="closesquare" size="25"/>
              </TouchableOpacity>
              <Text style={styles.modalCustomContentHeader}>Custom Exercise</Text>
              <TouchableOpacity onPress={() => {
                                saveCustomExercise();
                                handleBoth();
              }}>
                <Text style={styles.save}>Save</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.exerciseName}
              placeholder='Exercise name'
              onChangeText={setCustomExercise}
              value={customExercise}
              autoCapitalize='words'
            />
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
              <Text style={styles.category}>Category</Text>
              <Dropdown
                style={styles.dropdown}
                placeholder='None'
                placeholderStyle={styles.dropdownText}
                data={exercisesCategory}
                labelField="label"
                valueField="value"
                onChange={item => {
                  setValue(item.label);
                  setIsFocus(false);
                }}
              />
            </View>
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
      width: "98%",
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
    addCustomBtn: {
      marginTop: 5,
      marginBottom: 35,
    },
    addCustomBtnText: {
      color: "#805281"
    },
    modalCustomContent: {
      backgroundColor: "#F9F9F9",
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 30,
      marginHorizontal: 20,
      height: RFValue(120),
      width: "90%",
    },
    modalCustomContentHeader: {
      fontFamily: "Inter_500Medium",
      fontSize: RFValue(15),
      textAlign: "center",
    },
    exerciseName: {
      backgroundColor: "#ECECEC",
      height: RFValue(25),
      width: "100%",
      borderRadius: 5,
      paddingHorizontal: 15,
      marginTop: 10,
    },
    category: {
      fontFamily: "Inter_500Medium",
      paddingVertical: 15,
      fontSize: RFValue(12),
    },
    save: {
      fontFamily: "Inter_500Medium",
      fontSize: RFValue(12),
      color: "#805281",
    },
    dropdown: {
      paddingVertical: 15,
      width: "60%",
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    dropdownText: {
      fontFamily: "Inter_500Medium",
      fontSize: RFValue(12),
    }
});

export default EditWorkout