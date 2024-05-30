import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://uacjpabubimhfiauaewm.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhY2pwYWJ1YmltaGZpYXVhZXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNjQ1MzYsImV4cCI6MjAzMjY0MDUzNn0.uKomxm05AqxpvDUO5LQeo3QnXSA_bK61bD4Wwf-1wuk"
const supabase = createClient(supabaseUrl, supabaseKey);

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