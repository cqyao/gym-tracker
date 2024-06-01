import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://uacjpabubimhfiauaewm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhY2pwYWJ1YmltaGZpYXVhZXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNjQ1MzYsImV4cCI6MjAzMjY0MDUzNn0.uKomxm05AqxpvDUO5LQeo3QnXSA_bK61bD4Wwf-1wuk"
const supabase = createClient(supabaseUrl, supabaseKey);

export const addWorkout = async function(workout_name, exercise_list, last_performed) {
  const { data, error } = await supabase
  .from('Workouts')
  .insert({
    workout_name: workout_name,
    exercise_list: exercise_list
  })
  .select()

  if (error) {
    console.error("Error fetching exercises:", error);
    return null;
  }
  return data;
}

export const getWorkouts = async function() {
  const { data, error } = await supabase
  .from('Workouts')
  .select('*')

  if (error) {
    console.error("Error fetching exercises:", error);
    return null;
  }
  return data;
}

export const getWorkoutWithId = async function(idConstraint) {
  const { data, error } = await supabase
  .from('Workouts')
  .select('*')
  .eq("id", idConstraint)

  if (error) {
    console.error("Error fetching exercises:", error);
    return null;
  }
  return data[0];
}

export const updateLastPerformed = async function(id, date) {
  const { data, error } = await supabase
  .from('Workouts')
  .update({last_performed: date})
  .eq("id", id)
  .select()

  if (error) {
    console.error("Error fetching exercises:", error);
    return null;
  }

  return data;
}

export const getExercises = async function() {
  const { data, error } = await supabase
  .from('Exercises')
  .select('*')

  if (error) {
    console.error("Error fetching exercises:", error);
    return null;
  }

  return data;
};

export const addExercise = async function(exercise_name, type) {
  const { data, error } = await supabase
  .from('Exercises')
  .insert({
    exercise_name: exercise_name,
    type: type
  })
  .select()

  if (error) {
    console.error("Error fetching exercises:", error);
    return null;
  }

  return data;
}