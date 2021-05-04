import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  Easing,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { StyleService, Card, Icon, Button } from "@ui-kitten/components";

import CustomText from "./CustomText";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ICON_SIZE = 30;

const ChevronIcon = (props) => (
  <Icon
    fill="#8F9BB3"
    style={styles.icon}
    {...props}
    name="chevron-down-outline"
  />
);

const TaskSearchResultCard = ({ taskObject }) => {
  const [expanded, setExpanded] = useState(false);
  const [spinValue] = useState(new Animated.Value(0));

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

  const Footer = (props) => {
    const { style } = props;
    return (
      <View {...props} style={[style, styles.footerContainer]}>
        <Button style={styles.footerControl} size="small">
          ADD TASK
        </Button>
      </View>
    );
  };

  return (
    <Card
      onPress={() => {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(100, "linear", "opacity")
        );
        setExpanded(!expanded);
        spin();
      }}
      footer={Footer}
    >
      <View style={styles.contentContainer}>
        <View style={styles.taskContainer}>
          <CustomText numberOfLines={expanded ? null : 2}>{task}</CustomText>
        </View>
        <Animated.View
          style={[styles.iconContainer, { transform: [{ rotate }] }]}
        >
          <ChevronIcon />
        </Animated.View>
      </View>
    </Card>
  );
};

export default TaskSearchResultCard;

const styles = StyleService.create({
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
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
