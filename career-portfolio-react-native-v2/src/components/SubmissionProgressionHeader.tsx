import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@ui-kitten/components";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import ReText from "./ReText";
import ScreenTitle from "./ScreenTitle";

interface SubmissionProgressionHeaderProps {
  headerTitle: string;
  progress: Animated.SharedValue<number>;
}

const SubmissionProgressionHeader: React.FC<SubmissionProgressionHeaderProps> =
  ({ headerTitle, progress }) => {
    const theme = useTheme();

    const progressText = useDerivedValue(() => {
      return `Completed ${(progress.value * 100).toFixed(0)}%`;
    });

    const barAnimatedStyle = useAnimatedStyle(() => {
      return {
        width: `${interpolate(
          progress.value,
          [0, 1],
          [3, 100],
          Extrapolate.CLAMP
        )}%`,
      };
    });

    return (
      <View>
        <ScreenTitle title={headerTitle} />
        <View style={styles.progressContainer}>
          <ReText
            text={progressText}
            style={[styles.progressText, { color: theme["color-primary-500"] }]}
          />

          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBarBackground,
                { backgroundColor: theme["color-basic-300"] },
              ]}
            />
            <Animated.View
              style={[
                styles.progressBarForeground,
                barAnimatedStyle,
                { backgroundColor: theme["color-primary-500"] },
              ]}
            />
          </View>
        </View>
      </View>
    );
  };

export default SubmissionProgressionHeader;

const styles = StyleSheet.create({
  progressContainer: {
    height: 25,
    justifyContent: "flex-end",
  },
  progressText: {
    fontSize: 12,
    alignSelf: "flex-end",
  },
  progressBarContainer: {
    height: 8,
  },
  progressBarForeground: {
    height: "100%",
    position: "absolute",
    borderRadius: 16,
    zIndex: 1,
  },
  progressBarBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 16,
  },
});
