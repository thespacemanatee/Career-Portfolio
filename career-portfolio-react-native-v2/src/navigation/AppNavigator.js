import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleService } from "@ui-kitten/components";

import WelcomeScreen from "../screens/WelcomeScreen";
import OccupationsScreen from "../screens/OccupationsScreen";
import CoreTasksScreen from "../screens/CoreTasksScreen";
import LifeTasksScreen from "../screens/LifeTasksScreen";
import RankingsScreen from "../screens/RankingsScreen";

const AppNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.screen}>
        <Navigator headerMode="none">
          <Screen name="Welcome" component={WelcomeScreen} />
          <Screen name="Occupations" component={OccupationsScreen} />
          <Screen name="CoreTasks" component={CoreTasksScreen} />
          <Screen name="LifeTasks" component={LifeTasksScreen} />
          <Screen name="Rankings" component={RankingsScreen} />
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
