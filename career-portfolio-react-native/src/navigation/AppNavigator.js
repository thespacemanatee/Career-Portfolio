import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import SelectOccupationScreen from "../screens/SelectOccupationScreen";
import WorkScheduleScreen from "../screens/WorkScheduleScreen";
import LifeTasksScreen from "../screens/LifeTasksScreen";
import Colors from "../constants/Colors";
import { storeVerbs } from "../store/actions/verbs";
import { screenOptions as selectOccupationsScreenOptions } from "../screens/SelectOccupationScreen";
import { screenOptions as workScheduleScreenOptions } from "../screens/WorkScheduleScreen";

// function CustomNavigationBar({ navigation, previous }) {
//   return (
//     <Appbar.Header>
//       {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
//       <Appbar.Content title={navigation.routeName} />
//     </Appbar.Header>
//   );
// }

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : undefined,
  },
  //   headerTitleStyle: {
  //     fontFamily: "open-sans-bold",
  //   },
  //   headerBackTitleStyle: {
  //     fontFamily: "open-sans",
  //   },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const Stack = createStackNavigator();

export const RootNavigator = (props) => {
  const actionVerbs = props.data.actionVerbs;
  // console.log(actionVerbs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(storeVerbs(actionVerbs));
  }, [actionVerbs]);
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={defaultNavOptions}
      //   screenOptions={{
      //     header: (props) => <CustomNavigationBar {...props} />,
      //   }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerTitle: "Welcome" }}
      />
      <Stack.Screen
        name="SelectOccupation"
        component={SelectOccupationScreen}
        options={selectOccupationsScreenOptions}
      />
      <Stack.Screen
        name="WorkSchedule"
        component={WorkScheduleScreen}
        options={workScheduleScreenOptions}
      />
      <Stack.Screen
        name="LifeTasks"
        component={LifeTasksScreen}
        // options={}
      />
    </Stack.Navigator>
  );
};
