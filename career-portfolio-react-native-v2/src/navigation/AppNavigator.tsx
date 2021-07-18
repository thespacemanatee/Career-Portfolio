import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleService } from "@ui-kitten/components";

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
import {
  isReadyRef,
  navigationRef,
  submissionProgressRef,
} from "./NavigationHelper";
import { PROGRESS_HEADER_HEIGHT } from "../helpers/config/config";
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

  const NewSubmissionStackNavigator = () => {
    return (
      <View style={styles.screen}>
        <ThemedBackButton
          navigation={navigationRef.current}
          style={[backAnimatedStyle, styles.backButton]}
        />
        <View style={styles.submissionProgressHeader}>
          <SubmissionProgressionHeader
            headerTitle="Make a Submission"
            progress={submissionProgress}
          />
        </View>
        <Navigator screenOptions={fadeSlideConfig}>
          <Screen name="Occupations" component={OccupationsScreen} />
          <Screen
            name="CreateSubmissionStack"
            component={CreateSubmissionStackNavigator}
          />
        </Navigator>
      </View>
    );
  };

  const CreateSubmissionStackNavigator = () => {
    return (
      <View style={styles.screen}>
        <Navigator screenOptions={fadeSlideConfig}>
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
        <Screen
          name="CreateSubmissionStack"
          component={CreateSubmissionStackNavigator}
        />
      </Navigator>
    );
  };

  const ResultsStackNavigator = () => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          submissionProgress.value,
          [0, 1 / NUMBER_OF_SUBMISSION_SCREENS],
          [0, PROGRESS_HEADER_HEIGHT],
          Extrapolate.CLAMP
        ),
      };
    });

    return (
      <View style={styles.screen}>
        <ThemedBackButton
          navigation={navigationRef.current}
          style={[backAnimatedStyle, styles.backButton]}
        />
        <Animated.View style={animatedStyle}>
          <View style={styles.submissionProgressHeader}>
            <SubmissionProgressionHeader
              headerTitle="Edit a Submission"
              progress={submissionProgress}
            />
          </View>
        </Animated.View>
        <Navigator screenOptions={slideConfig}>
          <Screen name="SubmitLoading" component={SubmitLoadingScreen} />
          <Screen name="ResultsPager" component={ResultsPagerScreen} />
          <Screen name="ResultsDetails" component={ResultsDetailsScreen} />
          <Screen
            name="CreateSubmissionStack"
            component={CreateSubmissionStackNavigator}
          />
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
      <SafeAreaView style={styles.screen}>
        <Navigator screenOptions={slideConfig}>
          <Screen name="Dashboard" component={DashboardScreen} />
          <Screen
            name="NewSubmissionStack"
            component={NewSubmissionStackNavigator}
          />
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
  submissionProgressHeader: {
    marginHorizontal: 16,
    height: PROGRESS_HEADER_HEIGHT,
  },
  backButton: {
    margin: 16,
  },
});
