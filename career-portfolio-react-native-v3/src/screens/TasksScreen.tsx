import React from "react";
import { StyleSheet, View } from "react-native";

import { removeFirstTask } from "../app/features/tasks";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { SwipeableTaskCard } from "../components/ui/SwipeableTaskCard";

export const TasksScreen = () => {
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
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
});
