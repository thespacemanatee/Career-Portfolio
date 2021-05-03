import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  Easing,
  View,
} from "react-native";
import { StyleService, Card, Icon } from "@ui-kitten/components";
import CustomText from "./CustomText";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ChevronIcon = (props) => (
  <Icon
    fill="#8F9BB3"
    style={styles.icon}
    {...props}
    name="chevron-down-outline"
  />
);

const TaskCard = ({ taskObject }, ...props) => {
  const [expanded, setExpanded] = useState(false);
  const { task, taskId, IWA_Title } = taskObject;

  const [spinValue] = useState(new Animated.Value(0));

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

  return (
    <Card
      onPress={() => {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(100, "linear", "opacity")
        );
        setExpanded(!expanded);
        spin();
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <CustomText numberOfLines={expanded ? null : 2}>{task}</CustomText>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <ChevronIcon />
        </Animated.View>
      </View>
    </Card>
  );
};

export default TaskCard;

const styles = StyleService.create({
  tile: {
    backgroundColor: "lightgrey",
    borderWidth: 0.5,
    borderColor: "#d6d7da",
  },
  icon: {
    width: 32,
    height: 32,
  },
});
