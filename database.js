import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabaseAsync('database')

const addWorkout = () => {
  db.transaction((tx) => {
    tx.executeSql('')
  })
}