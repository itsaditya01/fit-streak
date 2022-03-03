import React, { useContext, useState, useEffect } from "react";
import { WebData } from "../data/WebData";

const ExerciseContext = React.createContext();

export const useExercise = () => {
  return useContext(ExerciseContext);
};
let age = 78;
const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);
  const setExercisesFor7Days = () => {
    if (age >= 40 && exercises.length < 7) {
      WebData.moreThan40.day1.exercise.map((item) => {
        setExercises(exercises.push(item));
      });
    }
  };
  //   console.log(exercises);
  return (
    <ExerciseContext.Provider
      value={{ exercises, setExercises, setExercisesFor7Days }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};
export default ExerciseProvider;
