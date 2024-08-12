import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { RFValue } from "react-native-responsive-fontsize";

const Exercise = ({ index, name, pr, onExerciseUpdate }) => {
  const [sets, setSets] = useState(["", "", ""]);
  const [weights, setWeights] = useState(["", "", ""]);
  const [reps, setReps] = useState(["", "", ""]);

  useEffect(() => {
    const exerciseData = { index, name, sets, weights, reps };
    onExerciseUpdate(exerciseData);
  }, [sets, weights, reps]);

  const handleSetChange = (text, idx) => {
    const newSets = [...sets];
    newSets[idx] = text;
    setSets(newSets);
  };

  const handleWeightChange = (text, idx) => {
    const newWeights = [...weights];
    newWeights[idx] = text;
    setWeights(newWeights);
  };

  const handleRepChange = (text, idx) => {
    const newReps = [...reps];
    newReps[idx] = text;
    setReps(newReps);
  };

  return (
    <View style={styles.outer}>
      <Text style={styles.exerciseName}>{name}</Text>
      <View style={styles.container}>
        <View style={styles.setColumn}>
          <Text style={styles.detailsHeader}>Set</Text>
          {sets.map((value, idx) => (
            <TextInput
              key={idx}
              style={styles.setInput}
              inputMode={"numeric"}
              maxLength={2}
              value={value}
              onChangeText={(text) => handleSetChange(text, idx)}
            />
          ))}
        </View>
        <View style={styles.setColumn}>
          <Text style={styles.detailsHeader}>Weight</Text>
          {weights.map((value, idx) => (
            <TextInput
              key={idx}
              style={styles.weightInput}
              maxLength={3}
              inputMode={"numeric"}
              value={value}
              onChangeText={(text) => handleWeightChange(text, idx)}
            />
          ))}
        </View>
        <View style={styles.setColumn}>
          <Text style={styles.detailsHeader}>Reps</Text>
          {reps.map((value, idx) => (
            <TextInput
              key={idx}
              style={styles.repInput}
              maxLength={2}
              inputMode={"numeric"}
              value={value}
              onChangeText={(text) => handleRepChange(text, idx)}
            />
          ))}
        </View>
        <View style={styles.setColumn}>
          <Text style={styles.detailsHeader}>Previous</Text>
          <Text style={styles.prInput}>{pr}</Text>
          <Text style={styles.prInput}>{pr}</Text>
          <Text style={styles.prInput}>{pr}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flexDirection: "row",
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "white",
        height: RFValue(110),
        width: "98%",
        padding: RFValue(8),
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 1,  
        // For Android phones
        elevation: 5
    },
    outer: {
        marginTop: 10,
        overflow: 'hidden',
        paddingBottom: 20,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    deleteButton: {
      marginRight: 10,
      color: "red",
      marginTop: 5,
    },
    exerciseName: {
      fontFamily: "Inter_500Medium",
      fontWeight: "500",
      fontSize: "18",
      marginLeft: 5,
    },
    detailsHeaderView: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    inputView: {
      marginTop: 7,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    detailsHeader: {
      fontFamily: "Inter_700Bold",
      fontWeight: "700",
      alignSelf: "center",
    },
    setInput: {
      width: RFValue(25),
      height: RFValue(25),
      backgroundColor: "#ECECEC",
      marginTop: 3,
      borderRadius: 5,
      padding: 5,
      textAlign: "center",
      fontWeight: "900",
      color: "orange",
    },
    weightInput: {
      width: RFValue(55),
      height: RFValue(25),
      backgroundColor: "#ECECEC",
      marginTop: 3,
      borderRadius: 5,
      padding: 5,
      textAlign: "center",
    },
    repInput: {
      width: RFValue(35),
      height: RFValue(25),
      backgroundColor: "#ECECEC",
      marginTop: 3,
      borderRadius: 5,
      padding: 5,
      textAlign: "center",
    },
    prInput: {
      fontFamily: "Inter_500Medium",
      fontSize: RFValue(13),
      width: RFValue(80),
      height: RFValue(25),
      backgroundColor: "#ECECEC",
      marginTop: 3,
      borderRadius: 5,
      padding: 5,
      textAlign: "center",
      color: "grey"
    }, 
    setColumn: {
      flexDirection: "column",
      marginRight: 20,
    }

});

export default Exercise