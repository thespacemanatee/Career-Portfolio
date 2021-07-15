import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
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
import SubmitLoadingScreen from "../screens/SubmitLoadingScreen";
import SubmissionProgressionHeader from "../components/SubmissionProgressionHeader";
import { isReadyRef, submissionProgressRef } from "./NavigationHelper";
import ThemedBackButton from "../components/ThemedBackButton";
import {
  fadeSlideConfig,
  modalConfig,
  slideConfig,
  NUMBER_OF_SUBMISSION_SCREENS,
  tabConfig,
} from "./NavigationConfig";
import PastResultsScreen from "../screens/PastResultsScreen";

const AppNavigator = () => {
  const submissionProgress = useSharedValue(0);

  const { Navigator, Screen } = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const handleNavigationStateChange = () => {
    const toValue =
      (submissionProgressRef.current ? submissionProgressRef.current : 0) /
      NUMBER_OF_SUBMISSION_SCREENS;
    submissionProgress.value = withTiming(toValue, { duration: 500 });
  };

  const backAnimatedStyle = useAnimatedStyle(() => {
    const prevScreen =
      (NUMBER_OF_SUBMISSION_SCREENS - 1) / NUMBER_OF_SUBMISSION_SCREENS;
    return {
      opacity: interpolate(
        submissionProgress.value,
        [prevScreen, 1],
        [1, 0],
        Extrapolate.CLAMP
      ),
      height: interpolate(
        submissionProgress.value,
        [prevScreen, 1],
        [20, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  const CreateSubmissionStackNavigator = () => {
    return (
      <View style={styles.screen}>
        <ThemedBackButton style={backAnimatedStyle} />
        <View style={styles.submissionProgressHeader}>
          <SubmissionProgressionHeader
            headerTitle="Make a Submission"
            progress={submissionProgress}
          />
        </View>
        <Navigator screenOptions={fadeSlideConfig}>
          <Screen name="Occupations" component={OccupationsScreen} />
          <Screen name="CoreTasks" component={CoreTasksScreen} />
          <Screen name="LifeTasksStack" component={LifeTasksStackNavigator} />
          <Screen name="Rankings" component={RankingsScreen} />
          <Screen name="SubmitLoading" component={SubmitLoadingScreen} />
        </Navigator>
      </View>
    );
  };

  const LifeTasksStackNavigator = () => {
    return (
      <Navigator screenOptions={modalConfig}>
        <Screen name="LifeTasks" component={LifeTasksScreen} />
        <Screen name="AddByOccupation" component={AddByOccupationScreen} />
        <Screen name="AddByAction" component={AddByActionScreen} />
      </Navigator>
    );
  };

  const ResultsStackNavigator = () => {
    return (
      <Navigator screenOptions={modalConfig}>
        <Screen name="ResultsPager" component={ResultsPagerScreen} />
        <Screen name="ResultsDetails" component={ResultsDetailsScreen} />
      </Navigator>
    );
  };

  const HomeStackNavigator = () => {
    return (
      <Navigator screenOptions={slideConfig}>
        <Screen name="Welcome" component={WelcomeScreen} />
        <Screen
          name="CreateSubmission"
          component={CreateSubmissionStackNavigator}
        />
      </Navigator>
    );
  };

  const PastResultsStackNavigator = () => {
    return (
      <View style={styles.screen}>
        <Navigator screenOptions={slideConfig}>
          <Screen name="Past Results" component={PastResultsScreen} />
          <Screen name="SubmitLoading" component={SubmitLoadingScreen} />
          <Screen name="Results" component={ResultsStackNavigator} />
        </Navigator>
      </View>
    );
  };

  return (
    <NavigationContainer
      onStateChange={handleNavigationStateChange}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <SafeAreaView style={styles.navigationContainer}>
        <Tab.Navigator screenOptions={tabConfig}>
          <Tab.Screen name="Home" component={HomeStackNavigator} />
          <Tab.Screen name="History" component={PastResultsStackNavigator} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleService.create({
  navigationContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  submissionProgressHeader: {
    marginVertical: 12,
  },
  backButton: {
    marginBottom: 12,
  },
});
