import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { RFValue } from "react-native-responsive-fontsize";


const EditExercise = ({index, name, deleteExercise}) => {

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
        <View style={styles.setColumn}>
          <Text style={styles.detailsHeader}>Set</Text>
          <TextInput style={styles.setInput} />
        </View>
        <View style={styles.setColumn}>
          <Text style={styles.detailsHeader}>Rep</Text>
          <TextInput style={styles.repInput} />
        </View>
        <View style={styles.setColumn}>
          <Text style={styles.detailsHeader}>Weight</Text>
          <TextInput style={styles.weightInput} />
        </View>
        <View style={styles.setColumn}>
          <Text style={styles.detailsHeader}>Previous</Text>
          <TextInput style={styles.prInput} />
        </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginTop: 5,
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
      textAlign: 'center',
    },
    repInput: {
      width: RFValue(35),
      height: RFValue(25),
      backgroundColor: "#ECECEC",
      marginTop: 3,
      borderRadius: 5,
      padding: 5,
      textAlign: 'center',
    },
    prInput: {
      fontFamily: "Inter_500Medium",
      fontSize: RFValue(13),
      width: RFValue(75),
      height: RFValue(25),
      backgroundColor: "#ECECEC",
      marginTop: 3,
      borderRadius: 5,
      padding: 5,
      textAlign: 'center',
      color: "grey",
    },
    setColumn: {
      flexDirection: "column",
      marginRight: 20,
    }

});

export default EditExercise