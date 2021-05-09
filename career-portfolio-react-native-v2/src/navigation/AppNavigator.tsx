import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleService } from "@ui-kitten/components";

import WelcomeScreen from "../screens/WelcomeScreen";
import OccupationsScreen from "../screens/OccupationsScreen";
import CoreTasksScreen from "../screens/CoreTasksScreen";
import LifeTasksScreen from "../screens/LifeTasksScreen";
import RankingsScreen from "../screens/RankingsScreen";
import AddByActionScreen from "../screens/LifeTasks/AddByActionScreen";
import AddByOccupationScreen from "../screens/LifeTasks/AddByOccupationScreen";
import ResultsPagerScreen from "../screens/Results/ResultsPagerScreen";
import ResultsDetailsScreen from "../screens/Results/ResultsDetailsScreen";

const AppNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  const linking = {
    prefixes: ["http://localhost:19006"],
    // config,
  };

  const LifeTasksStackNavigator = () => {
    return (
      <Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        })}
      >
        <Screen name="LifeTasks" component={LifeTasksScreen} />
        <Screen name="AddByOccupation" component={AddByOccupationScreen} />
        <Screen name="AddByAction" component={AddByActionScreen} />
      </Navigator>
    );
  };

  const ResultsStackNavigator = () => {
    return (
      <Navigator
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
        })}
      >
        <Screen name="ResultsPager" component={ResultsPagerScreen} />
        <Screen name="ResultsDetails" component={ResultsDetailsScreen} />
      </Navigator>
    );
  };

  return (
    <NavigationContainer linking={linking}>
      <SafeAreaView style={styles.screen}>
        <Navigator
          screenOptions={({ route, navigation }) => ({
            headerShown: false,
            gestureEnabled: true,
            cardOverlayEnabled: true,
            ...TransitionPresets.SlideFromRightIOS,
          })}
        >
          <Screen name="Welcome" component={WelcomeScreen} />
          <Screen name="Occupations" component={OccupationsScreen} />
          <Screen name="CoreTasks" component={CoreTasksScreen} />
          <Screen name="LifeTasksStack" component={LifeTasksStackNavigator} />
          <Screen name="Rankings" component={RankingsScreen} />
          <Screen name="ResultsStack" component={ResultsStackNavigator} />
        </Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleService.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
});
