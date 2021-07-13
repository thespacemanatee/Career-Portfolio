import React from "react";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import {
  // eslint-disable-next-line import/no-named-default
  default as Reanimated,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleService, useTheme } from "@ui-kitten/components";
import { Animated, TouchableOpacity, View } from "react-native";
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
import CustomText from "../components/CustomText";
import { isReadyRef, submissionNavigationRef } from "./NavigationHelper";

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

const NUMBER_OF_SUBMISSION_SCREENS = 4;

const AnimatedTouchableOpacity =
  Reanimated.createAnimatedComponent(TouchableOpacity);

const AppNavigator = () => {
  const submissionProgress = useSharedValue(0);

  const { Navigator, Screen } = createStackNavigator();

  const theme = useTheme();

  const handleNavigationStateChange = ({ routes }) => {
    const submissionRoutes = routes.filter(
      (route) => route.name === "CreateSubmission"
    );
    const toValue =
      (submissionRoutes.length > 0 ? submissionRoutes[0].state.index : 0) /
      NUMBER_OF_SUBMISSION_SCREENS;
    submissionProgress.value = withTiming(toValue, { duration: 1000 });
  };

  const CreateSubmissionStackNavigator = () => {
    const handleGoBack = () => {
      submissionNavigationRef.current.goBack();
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

    return (
      <>
        <View style={styles.createSubmissionBackground} />
        <View style={styles.createSubmissionContainer}>
          <AnimatedTouchableOpacity
            onPress={handleGoBack}
            style={backAnimatedStyle}
          >
            <CustomText
              fontFamily="medium"
              style={{ color: theme["color-primary-500"] }}
            >
              Back
            </CustomText>
          </AnimatedTouchableOpacity>
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
      </>
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

  return (
    <NavigationContainer
      onStateChange={handleNavigationStateChange}
      onReady={() => {
        isReadyRef.current = true;
      }}
    >
      <SafeAreaView style={styles.screen}>
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
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  createSubmissionBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "white",
  },
  createSubmissionContainer: {
    flex: 1,
    padding: 16,
  },
  submissionProgressHeader: {
    marginVertical: 12,
  },
});
