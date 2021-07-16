import { Icon, useTheme } from "@ui-kitten/components";
import React, { useEffect } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CustomText from "./CustomText";

const BUTTON_SIZE_EXPANDED = 120;
const BUTTON_SIZE_COLLAPSED = 56;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface AnimatedFabProps {
  icon: string;
  label?: string;
  showLabel?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

const AnimatedFab: React.FC<AnimatedFabProps> = ({
  icon,
  label,
  showLabel,
  style,
  onPress,
}) => {
  const progress = useSharedValue(0);

  const theme = useTheme();

  const animatedFABStyles = useAnimatedStyle(() => {
    return {
      width: interpolate(
        progress.value,
        [0, 1],
        [BUTTON_SIZE_COLLAPSED, BUTTON_SIZE_EXPANDED],
        Extrapolate.CLAMP
      ),
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0.5, 1], [0, 1], Extrapolate.CLAMP),
      right: interpolate(progress.value, [0, 1], [-BUTTON_SIZE_EXPANDED, 0]),
    };
  });

  useEffect(() => {
    progress.value = showLabel
      ? withTiming(1, { duration: 100 })
      : withTiming(0, { duration: 100 });
  }, [progress, showLabel]);

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.fabContainer,
        style,
        { backgroundColor: theme["color-primary-500"] },
        animatedFABStyles,
      ]}
      onPress={onPress}
    >
      <Icon style={styles.icon} fill="white" name={icon} />
      <Animated.View style={animatedTextStyles}>
        <CustomText style={styles.label}>{label}</CustomText>
      </Animated.View>
    </AnimatedTouchableOpacity>
  );
};

export default AnimatedFab;

const styles = StyleSheet.create({
  fabContainer: {
    borderRadius: BUTTON_SIZE_COLLAPSED / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "space-between",
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
    height: BUTTON_SIZE_COLLAPSED,
    paddingHorizontal: BUTTON_SIZE_COLLAPSED / 4,
  },
  icon: {
    width: BUTTON_SIZE_COLLAPSED / 2,
    height: BUTTON_SIZE_COLLAPSED / 2,
  },
  label: {
    color: "white",
  },
});
