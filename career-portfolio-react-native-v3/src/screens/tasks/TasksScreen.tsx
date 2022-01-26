import React, { createRef, useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { batch } from "react-redux";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type BottomSheet from "@gorhom/bottom-sheet";

import {
  setSwipedTask,
  removeFirstTask,
  resetTasks,
  setRecommendedTasks,
  setTaskSet,
} from "../../app/features/tasks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AnimatedDislikeIndicator } from "../../components/ui/AnimatedDislikeIndicator";
import { AnimatedLikeIndicator } from "../../components/ui/AnimatedLikeIndicator";
import { SwipeableTaskCard } from "../../components/ui/SwipeableTaskCard";
import type { RootStackParamList } from "../../navigation";
import { SPACING } from "../../resources";
import { getRecommendedTasks } from "../../services";
import { toTopRecommendedTask } from "../../utils";
import { NavigationHeader } from "../../components/navigation";

import { SwipedTasksBottomSheet } from "./SwipedTasksBottomSheet";

type TasksScreenProps = NativeStackScreenProps<RootStackParamList, "Tasks">;

export const TasksScreen = ({ navigation, route }: TasksScreenProps) => {
  const sheetRef = createRef<BottomSheet>();
  const swipeProgress = useSharedValue(0);
  const recommendedTasks = useAppSelector(
    (state) => state.tasks.recommendedTasks
  );
  const taskSet = useAppSelector((state) => state.tasks.taskSet);
  const swipedTasks = useAppSelector((state) => state.tasks.swipedTasks);

  const { selectedJobClass } = route.params;

  const dispatch = useAppDispatch();

  const likeTask = async (iwaId: string) => {
    if (!selectedJobClass) {
      return;
    }
    const newSwipedTasks = [...swipedTasks];
    newSwipedTasks.push(iwaId);
    dispatch(setSwipedTask(newSwipedTasks));
    try {
      const { data } = await getRecommendedTasks(
        selectedJobClass,
        newSwipedTasks
      );
      const tasks = toTopRecommendedTask(JSON.parse(data.tasks));
      dispatch(resetTasks());
      batch(() => {
        dispatch(setTaskSet(taskSet + 1));
        dispatch(setRecommendedTasks(tasks));
      });
    } catch (err) {
      console.error(err);
    }
  };

  const dislikeTask = () => {
    dispatch(removeFirstTask());
  };

  const handleSnapPress = useCallback(() => {
    sheetRef.current?.expand();
  }, [sheetRef]);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, [sheetRef]);

  return (
    <View style={styles.container}>
      <NavigationHeader
        title="Tasks"
        subtitle="Find tasks that are relevant to you"
        onBackPress={navigation.goBack}
        onStarPress={handleSnapPress}
      />
      {recommendedTasks.map((task, idx) => {
        return (
          <SwipeableTaskCard
            key={task.iwaId}
            source={{
              uri: `https://picsum.photos/id/${
                (task.index + 1) * (taskSet + 1)
              }/200/300`,
            }}
            index={idx}
            iwaId={task.iwaId}
            taskSet={taskSet}
            taskIndex={task.index}
            onSwipeRight={likeTask}
            onSwipeLeft={dislikeTask}
            swipeProgress={(value) => {
              swipeProgress.value = value;
            }}
            style={{ zIndex: -idx }}
          />
        );
      })}
      {recommendedTasks.length > 0 && (
        <>
          <View style={styles.like} pointerEvents="box-none">
            <AnimatedLikeIndicator progress={swipeProgress} />
          </View>
          <View style={styles.dislike} pointerEvents="box-none">
            <AnimatedDislikeIndicator progress={swipeProgress} />
          </View>
        </>
      )}
      <SwipedTasksBottomSheet
        ref={sheetRef}
        swipedTasks={swipedTasks}
        jobClass={selectedJobClass}
      />
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
