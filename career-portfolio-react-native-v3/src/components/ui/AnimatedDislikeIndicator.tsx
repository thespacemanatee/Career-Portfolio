import React, { useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { SPACING } from "../../resources";

const SIZE = 72;
const ICON_SIZE = 32;

type AnimatedDislikeIndicatorProps = {
  progress: Animated.SharedValue<number>;
  style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
};

export const AnimatedDislikeIndicator = ({
  progress,
  style,
}: AnimatedDislikeIndicatorProps) => {
  const [isActive, setIsActive] = useState(false);
  const { colors } = useTheme();

  useDerivedValue(() => {
    if (progress.value <= -1) {
      runOnJS(setIsActive)(true);
    } else {
      runOnJS(setIsActive)(false);
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: progress.value <= -1 ? colors.destructive : "white",
    opacity: interpolate(progress.value, [-1, 0], [1, 0], Extrapolate.CLAMP),
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <Ionicons
        name="close"
        color={isActive ? "white" : colors.destructive}
        size={ICON_SIZE}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZE,
    width: SIZE,
    borderRadius: SPACING.spacing36,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
