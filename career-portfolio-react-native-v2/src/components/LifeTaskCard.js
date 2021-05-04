import React, { useState, useRef, useCallback } from "react";
import {
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  Easing,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { StyleService, Card, Icon } from "@ui-kitten/components";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { removeLifeTask } from "../app/features/tasks/lifeTasksSlice";
import CustomText from "./CustomText";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ICON_SIZE = 30;

const TrashIcon = (props) => (
  <Icon fill="white" {...props} name="trash" style={styles.icon} />
);

const ChevronIcon = (props) => (
  <Icon
    fill="#8F9BB3"
    style={styles.icon}
    {...props}
    name="chevron-down-outline"
  />
);

const TaskCard = ({ taskObject }) => {
  const [expanded, setExpanded] = useState(false);
  const [spinValue] = useState(new Animated.Value(0));
  const leftSwipeable = useRef(null);

  const { task, taskId } = taskObject;

  const dispatch = useDispatch();

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
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
            <View style={styles.taskContainer}>
              <CustomText numberOfLines={expanded ? null : 2}>
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
  taskContainer: {
    flex: 0.9,
  },
  iconContainer: {
    flex: 0.1,
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
