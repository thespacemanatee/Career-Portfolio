import React from "react";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
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
import { Animated, View } from "react-native";
import { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types";

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
import { isReadyRef } from "./NavigationHelper";
import ThemedBackButton from "../components/ThemedBackButton";

const modalConfig: () => StackNavigationOptions = () => ({
  headerShown: false,
  gestureEnabled: true,
  cardShadowEnabled: false,
  cardOverlayEnabled: false,
  cardStyle: {
    backgroundColor: "transparent",
  },
  ...TransitionPresets.ModalPresentationIOS,
});

const slideConfig: () => StackNavigationOptions = () => ({
  headerShown: false,
  gestureEnabled: true,
  cardOverlayEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
});

const fadeSlideConfig: () => StackNavigationOptions = () => ({
  headerShown: false,
  gestureEnabled: true,
  cardShadowEnabled: false,
  cardOverlayEnabled: false,
  cardStyle: {
    backgroundColor: "transparent",
  },
  cardStyleInterpolator: forSlide,
  transitionSpec: {
    open: customTransitionSpec,
    close: customTransitionSpec,
  },
});

const customTransitionSpec: TransitionSpec = {
  animation: "timing",
  config: {
    duration: 1000,
  },
};

const forSlide: StackCardStyleInterpolator = ({
  current,
  next,
  inverted,
  layouts: { screen },
}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        })
      : 0
  );

  return {
    cardStyle: {
      opacity: Animated.multiply(
        progress.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [0, 1, 0],
          extrapolate: "clamp",
        }),
        inverted
      ),
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [screen.width, 0, screen.width * -0.5],
              extrapolate: "clamp",
            }),
            inverted
          ),
        },
      ],
    },
  };
};

export const NUMBER_OF_SUBMISSION_SCREENS = 4;

const AppNavigator = () => {
  const submissionProgress = useSharedValue(0);

  const { Navigator, Screen } = createStackNavigator();

  const handleNavigationStateChange = ({ routes }) => {
    const submissionRoutes = routes.filter(
      (route) => route.name === "CreateSubmission"
    );
    const toValue =
      (submissionRoutes.length > 0 ? submissionRoutes[0].state.index : 0) /
      NUMBER_OF_SUBMISSION_SCREENS;
    submissionProgress.value = withTiming(toValue, { duration: 1000 });
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
      <View style={styles.screen}>
        <ThemedBackButton style={[styles.backButton, backAnimatedStyle]} />
        <Navigator screenOptions={modalConfig}>
          <Screen name="ResultsPager" component={ResultsPagerScreen} />
          <Screen name="ResultsDetails" component={ResultsDetailsScreen} />
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
        <Navigator screenOptions={slideConfig}>
          <Screen name="Welcome" component={WelcomeScreen} />
          <Screen
            name="CreateSubmission"
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
    backgroundColor: "white",
  },
  submissionProgressHeader: {
    marginVertical: 12,
  },
  backButton: {
    marginBottom: 12,
  },
});
