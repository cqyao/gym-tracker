import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import * as SQLite from 'expo-sqlite';

const testDB = () => {

  async function databaseStuff() {
    const db = await SQLite.openDatabaseAsync('GymRite')
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT);
      INSERT INTO test (value) VALUES ('test1');
    `);
    const result = await db.getFirstAsync('SELECT * FROM test');
    console.log(result);
  }
  

  return (
    <View>
      <TouchableOpacity onPress={databaseStuff}><Text>Press</Text></TouchableOpacity>
    </View>
  )
}

export default testDB