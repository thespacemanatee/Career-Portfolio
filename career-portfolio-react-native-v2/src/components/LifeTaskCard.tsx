import React, { useRef, useCallback } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { StyleService, Icon } from "@ui-kitten/components";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { removeLifeTask } from "../app/features/tasks/tasksSlice";
import { ICON_SIZE } from "../helpers/config/config";
import BaseTaskCard from "./BaseTaskCard";

const TrashIcon = (props) => (
  <Icon fill="white" {...props} name="trash" style={styles.icon} />
);

const LifeTasksCard = ({ taskObject }) => {
  const leftSwipeable = useRef(null);

  const { task, taskId } = taskObject;

  const dispatch = useDispatch();

  const rightSwipe = useCallback(() => {
    dispatch(removeLifeTask(taskId));
  }, [dispatch, taskId]);

  const leftComponent = useCallback(() => {
    return (
      <View style={styles.deleteBox}>
        <TrashIcon />
      </View>
    );
  }, []);

  return (
    <Swipeable
      ref={leftSwipeable}
      renderLeftActions={leftComponent}
      onSwipeableOpen={rightSwipe}
      friction={2}
    >
      <BaseTaskCard task={task} />
    </Swipeable>
  );
};

export default LifeTasksCard;

const styles = StyleService.create({
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  deleteBox: {
    justifyContent: "center",
    alignItems: "center",
    width: ICON_SIZE * 2,
    backgroundColor: "red",
  },
});
