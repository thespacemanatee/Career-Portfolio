import React, { useEffect } from "react";
import { StyleService } from "@ui-kitten/components";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Dimensions, View } from "react-native";

import { ResultsCountData } from "../types";
import CustomText from "./CustomText";
import ShadowCard from "./ShadowCard";
import TaskBarChart from "./TaskBarChart";

const ResultCard = ({
  index,
  item,
  similar,
  missing,
  notRelevant,
  onSelectCategory,
}: {
  index: number;
  item: ResultsCountData;
  similar: number;
  missing: number;
  notRelevant: number;
  onSelectCategory: (type: string, occupation: string) => void;
}) => {
  const progress = useSharedValue(0);

  const { width } = Dimensions.get("window");

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [-width, 0]);
    return {
      transform: [{ translateX }],
    };
  });

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1000 });
  }, [progress]);

  return (
    <ShadowCard style={styles.resultCard}>
      <CustomText
        style={styles.titleText}
      >{`${index}. ${item.title}`}</CustomText>
      <View style={styles.taskbarContainer}>
        <Animated.View style={animatedStyle}>
          <TaskBarChart
            notRelevant={notRelevant}
            similar={similar}
            missing={missing}
            occupation={item.title}
            onSelectCategory={onSelectCategory}
          />
        </Animated.View>
      </View>
    </ShadowCard>
  );
};

export default ResultCard;

const styles = StyleService.create({
  resultCard: {
    padding: 20,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 5,
  },
  taskbarContainer: {
    overflow: "hidden",
  },
});
