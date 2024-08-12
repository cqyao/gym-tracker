import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { RFValue } from "react-native-responsive-fontsize";


const Exercise = ({index, name}) => {

  // Functions
  

  return (
    <View style={styles.outer}>
      <Text style={styles.exerciseName}>{name}</Text>
      <View style={styles.container}>
        <View style={styles.setColumn}>
          <Text style={styles.detailsHeader}>Set</Text>
          <TextInput style={styles.setInput} inputMode={"numeric"} maxLength={2}/>
          <TextInput style={styles.setInput} />
          <TextInput style={styles.setInput} />
        </View>
        <View style={styles.setColumn}>
          <Text style={styles.detailsHeader}>Weight</Text>
          <TextInput style={styles.weightInput} maxLength={3} inputMode={"numeric"}/>
          <TextInput style={styles.weightInput} />
          <TextInput style={styles.weightInput} />
        </View>
        <View style={styles.setColumn}>
          <Text style={styles.detailsHeader}>Reps</Text>
          <TextInput style={styles.repInput} maxLength={2} inputMode={"numeric"}/>
          <TextInput style={styles.repInput} />
          <TextInput style={styles.repInput} />
        </View>
        <View style={styles.setColumn}>
          <Text style={styles.detailsHeader}>Previous</Text>
          <TextInput style={styles.prInput} editable={false}/>
          <TextInput style={styles.prInput} editable={false}/>
          <TextInput style={styles.prInput} editable={false}/>
        </View>
      </View>
    </View>
  )
}

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
    }, 
    setColumn: {
      flexDirection: "column",
      marginRight: 20,
    }

});

export default Exercise