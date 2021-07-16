import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, StyleService } from "@ui-kitten/components";

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
import DashboardScreen from "../screens/DashboardScreen";
import { isReadyRef, submissionProgressRef } from "./NavigationHelper";
import ThemedBackButton from "../components/ThemedBackButton";
import {
  fadeSlideConfig,
  modalConfig,
  slideConfig,
  NUMBER_OF_SUBMISSION_SCREENS,
} from "./NavigationConfig";

const AppNavigator = () => {
  const submissionProgress = useSharedValue(0);

  const { Navigator, Screen } = createStackNavigator();

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
      <Layout style={styles.screen}>
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
      </Layout>
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
      <Layout style={styles.screen}>
        <Navigator screenOptions={slideConfig}>
          <Screen name="SubmitLoading" component={SubmitLoadingScreen} />
          <Screen name="ResultsPager" component={ResultsPagerScreen} />
          <Screen name="ResultsDetails" component={ResultsDetailsScreen} />
        </Navigator>
      </Layout>
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
        <Navigator screenOptions={slideConfig}>
          <Screen name="Dashboard" component={DashboardScreen} />
          <Screen
            name="CreateSubmissionStack"
            component={CreateSubmissionStackNavigator}
          />
          <Screen name="ResultsStack" component={ResultsStackNavigator} />
        </Navigator>
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
  },
  submissionProgressHeader: {
    marginVertical: 12,
  },
  backButton: {
    marginBottom: 12,
  },
});
