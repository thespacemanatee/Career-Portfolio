import React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useTheme,
  Title,
  Text,
  Button,
  FAB,
  TouchableRipple,
  Appbar,
} from "react-native-paper";

import WelcomeScreen from "../screens/WelcomeScreen";
import SelectOccupationScreen from "../screens/SelectOccupationScreen";
import WorkScheduleScreen from "../screens/WorkScheduleScreen";

function CustomNavigationBar({ navigation, previous }) {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="My awesome app" />
    </Appbar.Header>
  );
}

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerTitle: "Welcome" }}
      />
      <Stack.Screen
        name="SelectOccupation"
        component={SelectOccupationScreen}
        options={{ headerTitle: "Select Your Occupation" }}
      />
      <Stack.Screen name="WorkSchedule" component={WorkScheduleScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
