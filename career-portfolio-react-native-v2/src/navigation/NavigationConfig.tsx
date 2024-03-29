import React from "react";
import { TransitionPresets } from "@react-navigation/stack";
import {
  StackCardStyleInterpolator,
  StackNavigationOptions,
  TransitionSpec,
} from "@react-navigation/stack/lib/typescript/src/types";
import { Icon } from "@ui-kitten/components";
import { Animated } from "react-native";

export const tabConfig = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName: string;

    if (route.name === "Home") {
      iconName = focused ? "home" : "home-outline";
    } else if (route.name === "History") {
      iconName = focused ? "pie-chart" : "pie-chart-outline";
    }

    return (
      <Icon
        name={iconName}
        fill={color}
        style={{ height: size, width: size }}
      />
    );
  },
});

export const modalConfig: () => StackNavigationOptions = () => ({
  headerShown: false,
  gestureEnabled: true,
  cardShadowEnabled: true,
  cardOverlayEnabled: true,
  ...TransitionPresets.ModalPresentationIOS,
});

export const transparentModalConfig: () => StackNavigationOptions = () => ({
  headerShown: false,
  gestureEnabled: true,
  cardShadowEnabled: false,
  cardOverlayEnabled: false,
  cardStyle: {
    backgroundColor: "transparent",
  },
  ...TransitionPresets.ModalPresentationIOS,
});

export const slideConfig: () => StackNavigationOptions = () => ({
  headerShown: false,
  gestureEnabled: true,
  cardOverlayEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
});

export const fadeSlideConfig: () => StackNavigationOptions = () => ({
  headerShown: false,
  gestureEnabled: true,
  cardShadowEnabled: false,
  cardOverlayEnabled: false,
  cardStyle: {
    backgroundColor: "transparent",
  },
  cardStyleInterpolator: forSlide,
  transitionSpec: {
    open: fadeSlideTransitionSpec,
    close: fadeSlideTransitionSpec,
  },
});

export const fadeSlideTransitionSpec: TransitionSpec = {
  animation: "timing",
  config: {
    duration: 500,
  },
};

export const forSlide: StackCardStyleInterpolator = ({
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
          inputRange: [0.75, 1, 1.75],
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
              outputRange: [screen.width, 0, screen.width * -1],
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
