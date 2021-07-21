import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { useTheme } from "@ui-kitten/components";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

import CustomText from "../CustomText";

interface ResultTaskCardProps {
  index: number;
  task: string;
}

const CARD_WIDTH = Dimensions.get("window").width;

const ResultTaskCard: React.FC<ResultTaskCardProps> = ({ index, task }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(index * 50, withSpring(1));
  }, [index, progress]);

  const theme = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [-CARD_WIDTH, 0]);
    const opacity = interpolate(progress.value, [0, 1], [0, 1]);
    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.taskContainer,
        animatedStyle,
        { backgroundColor: theme["color-basic-500"] },
      ]}
    >
      <CustomText>{task}</CustomText>
    </Animated.View>
  );
};

export default ResultTaskCard;

const styles = StyleSheet.create({
  taskContainer: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
  },
});
