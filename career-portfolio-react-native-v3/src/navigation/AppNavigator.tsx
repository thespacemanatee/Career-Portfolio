import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";

import { JobClassScreen } from "../screens/JobClassScreen";
import { TasksScreen } from "../screens/tasks/TasksScreen";
import { NavigationHeader } from "../components/navigation/NavigationHeader";
import { useAppDispatch } from "../app/hooks";
import type { JobClass } from "../app/features/jobClass";
import { setJobClasses } from "../app/features/jobClass";
import jobClasses from "../mock/job_classes.json";

import type { RootStackParamList } from ".";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const temp: JobClass[] = Object.entries(jobClasses).map((jobClass) => ({
      title: jobClass[0],
      socCode: jobClass[1],
    }));
    dispatch(setJobClasses(temp));
  }, [dispatch]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Job Class" component={JobClassScreen} />
      <Stack.Screen name="Tasks" component={TasksScreen} />
    </Stack.Navigator>
  );
};
