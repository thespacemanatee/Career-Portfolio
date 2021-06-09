import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  Easing,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { StyleService, Card, Icon, CheckBox } from "@ui-kitten/components";
import Swipeable from "react-native-gesture-handler/Swipeable";

import {
  addTask,
  removeTask,
  updateTaskType,
} from "../app/features/tasks/tasksSlice";
import CustomText from "./CustomText";
import { TaskType } from "../types";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ICON_SIZE = 30;

const TrashIcon = (props: any) => (
  <Icon fill="white" {...props} name="trash" style={styles.icon} />
);

const UndoIcon = (props: any) => (
  <Icon fill="white" {...props} name="undo" style={styles.icon} />
);

const ChevronIcon = (props: any) => (
  <Icon
    fill="#8F9BB3"
    style={styles.icon}
    {...props}
    name="chevron-down-outline"
  />
);

const TaskCard = ({ taskObject }) => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(false);
  const [spinValue] = useState(new Animated.Value(0));
  const leftSwipeable = useRef(null);

  const { task, taskId, taskType, deleted } = taskObject;

  const dispatch = useDispatch();

  const handleCheckChange = (nextChecked) => {
    setChecked(nextChecked);
    let type: TaskType;
    if (nextChecked === true) {
      type = TaskType.CORE;
    } else {
      type = TaskType.SUPPLEMENTARY;
    }
    dispatch(updateTaskType({ id: taskId, changes: { task_type: type } }));
  };

  useEffect(() => {
    if (taskType === TaskType.CORE) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [taskType]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "180deg"],
  });

  const spin = () => {
    Animated.timing(spinValue, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const rightSwipe = useCallback(() => {
    if (!deleted) {
      dispatch(removeTask({ id: taskId, changes: { deleted: true } }));
    } else {
      dispatch(addTask({ id: taskId, changes: { deleted: false } }));
    }
    leftSwipeable.current.close();
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
        <Card
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.create(100, "linear", "opacity")
            );
            setExpanded(!expanded);
            spin();
          }}
        >
          <View style={styles.contentContainer}>
            <View style={styles.checkboxContainer}>
              <CheckBox
                disabled={deleted}
                checked={checked}
                onChange={handleCheckChange}
              />
            </View>
            <View style={styles.taskContainer}>
              <CustomText
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ textDecorationLine: deleted ? "line-through" : null }}
                numberOfLines={expanded ? null : 2}
              >
                {task}
              </CustomText>
            </View>
            <Animated.View
              style={[styles.iconContainer, { transform: [{ rotate }] }]}
            >
              <ChevronIcon />
            </Animated.View>
          </View>
        </Card>
      </Swipeable>
    </View>
  );
};

export default TaskCard;

const styles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    borderRadius: 5,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkboxContainer: {
    flex: 0.1,
    height: "100%",
    justifyContent: "center",
  },
  taskContainer: {
    flex: 0.8,
  },
  iconContainer: {
    position: "absolute",
    right: 0,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  deleteBox: {
    justifyContent: "center",
    alignItems: "center",
    width: ICON_SIZE * 2,
  },
});
