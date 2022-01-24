import React from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import { removeFirstTask } from "../app/features/tasks";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AnimatedDislikeIndicator } from "../components/ui/AnimatedDislikeIndicator";
import { AnimatedLikeIndicator } from "../components/ui/AnimatedLikeIndicator";
import { SwipeableTaskCard } from "../components/ui/SwipeableTaskCard";
import { SPACING } from "../resources";

export const TasksScreen = () => {
  const swipeProgress = useSharedValue(0);
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const dispatch = useAppDispatch();

  const likeTask = () => {
    dispatch(removeFirstTask());
  };

  const dislikeTask = () => {
    dispatch(removeFirstTask());
  };

  return (
    <View style={styles.container}>
      {tasks.map((task, idx) => {
        return (
          <SwipeableTaskCard
            key={idx}
            source={{ uri: `https://picsum.photos/id/${idx + 10}/200/300` }}
            index={tasks.length - 1 - idx}
            taskIndex={10 - idx}
            onSwipeRight={likeTask}
            onSwipeLeft={dislikeTask}
            swipeProgress={(value) => {
              swipeProgress.value = value;
            }}
          />
        );
      })}
      <View style={styles.like} pointerEvents="box-none">
        <AnimatedLikeIndicator progress={swipeProgress} />
      </View>
      <View style={styles.dislike} pointerEvents="box-none">
        <AnimatedDislikeIndicator progress={swipeProgress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  like: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "flex-end",
    margin: SPACING.spacing16,
  },
  dislike: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    margin: SPACING.spacing16,
  },
});
