/* eslint-disable camelcase */
import React, { useEffect, useState, useRef, useCallback } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { StyleService, Icon, CheckBox } from "@ui-kitten/components";
import Swipeable from "react-native-gesture-handler/Swipeable";

import {
  addTask,
  removeTask,
  updateTaskType,
} from "../app/features/tasks/tasksSlice";
import { TaskType } from "../types";
import { ICON_SIZE } from "../helpers/config/config";
import BaseTaskCard from "./BaseTaskCard";

const TrashIcon = (props: any) => (
  <Icon fill="white" {...props} name="trash" style={styles.icon} />
);

const UndoIcon = (props: any) => (
  <Icon fill="white" {...props} name="undo" style={styles.icon} />
);

const TaskCard = ({ taskObject }) => {
  const [checked, setChecked] = useState(false);
  const leftSwipeable = useRef(null);

  const { task, taskId, task_type, deleted } = taskObject;

  const dispatch = useDispatch();

  const handleCheckChange = (nextChecked) => {
    setChecked(nextChecked);
    const type: TaskType = nextChecked ? TaskType.CORE : TaskType.SUPPLEMENTARY;
    dispatch(updateTaskType({ id: taskId, changes: { task_type: type } }));
  };

  useEffect(() => {
    setChecked(task_type === TaskType.CORE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rightSwipe = useCallback(() => {
    leftSwipeable.current.close();
    if (!deleted) {
      dispatch(removeTask({ id: taskId, changes: { deleted: true } }));
    } else {
      dispatch(addTask({ id: taskId, changes: { deleted: false } }));
    }
  }, [deleted, dispatch, taskId]);

  const leftComponent = useCallback(() => {
    return (
      <View style={styles.deleteBox}>
        {deleted ? <UndoIcon /> : <TrashIcon />}
      </View>
    );
  }, [deleted]);

  return (
    <View style={styles.container}>
      <Swipeable
        ref={leftSwipeable}
        renderLeftActions={leftComponent}
        onSwipeableOpen={rightSwipe}
        friction={2}
      >
        <View style={styles.contentContainer}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={deleted}
              checked={checked}
              onChange={handleCheckChange}
            />
          </View>
          <BaseTaskCard task={task} deleted={deleted} />
        </View>
      </Swipeable>
    </View>
  );
};

export default TaskCard;

const styles = StyleService.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: "row",
    paddingLeft: 16,
    backgroundColor: "white",
    borderRadius: 8,
  },
  checkboxContainer: {
    flex: 0.1,
    height: "100%",
    justifyContent: "center",
  },
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
