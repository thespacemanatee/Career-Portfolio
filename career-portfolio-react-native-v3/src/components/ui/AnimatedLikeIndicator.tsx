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

import { SPACING } from "../../resources";
import { Star } from "../icons";

const SIZE = 72;
const ICON_SIZE = 32;

type AnimatedLikeIndicatorProps = {
  progress: Animated.SharedValue<number>;
  style?: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
};

export const AnimatedLikeIndicator = ({
  progress,
  style,
}: AnimatedLikeIndicatorProps) => {
  const [isActive, setIsActive] = useState(false);
  const { colors } = useTheme();

  useDerivedValue(() => {
    if (progress.value >= 1) {
      runOnJS(setIsActive)(true);
    } else {
      runOnJS(setIsActive)(false);
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: progress.value >= 1 ? colors.secondary : "white",
    opacity: interpolate(progress.value, [0, 1], [0, 1], Extrapolate.CLAMP),
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      <Star
        color={isActive ? "white" : colors.secondary}
        width={ICON_SIZE}
        height={ICON_SIZE}
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
