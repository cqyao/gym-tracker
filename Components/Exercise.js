import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFValue } from "react-native-responsive-fontsize";
import { TextInput } from 'react-native-gesture-handler';


const Exercise = ({index, name, deleteExercise}) => {

  // Functions
  const onDelete = () => {
    deleteExercise(index);
  }

  return (
    <View style={styles.outer}>
      <View style={styles.header}>
        <Text style={styles.exerciseName}>{name}</Text>
        <TouchableOpacity onPress={onDelete}>        
          <Text style={styles.deleteButton}>delete</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.detailsHeaderView}>
          <Text style={styles.detailsHeader}>Set</Text>
          <Text style={styles.detailsHeader}>Weight</Text>
          <Text style={styles.detailsHeader}>Reps</Text>
          <Text style={styles.detailsHeader}>Current PR</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.setInput}/>
          <TextInput style={styles.weightInput}/>
          <TextInput style={styles.repInput}/>
          <TextInput style={styles.prInput}/>
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.setInput}/>
          <TextInput style={styles.weightInput}/>
          <TextInput style={styles.repInput}/>
          <TextInput style={styles.prInput}/>
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.setInput}/>
          <TextInput style={styles.weightInput}/>
          <TextInput style={styles.repInput}/>
          <TextInput style={styles.prInput}/>
        </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "white",
        height: RFValue(110),
        width: "98%",
        padding: RFValue(10),
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
      marginLeft: 10,
      fontFamily: "Inter_500Medium",
      fontSize: "18",
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
      fontFamily: "Inter_700Bold"
    },
    setInput: {
      width: RFValue(20),
      height: RFValue(20),
      backgroundColor: "#ECECEC",
      borderRadius: 5,
      padding: 5,
    },
    weightInput: {
      width: RFValue(45),
      height: RFValue(20),
      backgroundColor: "#ECECEC",
      borderRadius: 5,
      padding: 5,
    },
    repInput: {
      width: RFValue(25),
      height: RFValue(20),
      backgroundColor: "#ECECEC",
      borderRadius: 5,
      padding: 5,
    },
    prInput: {
      width: RFValue(65),
      height: RFValue(20),
      backgroundColor: "#ECECEC",
      borderRadius: 5,
      padding: 5,
    }

});

export default Exercise