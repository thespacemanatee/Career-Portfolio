import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Pressable,
  UIManager,
  View,
} from "react-native";
import { Icon } from "@ui-kitten/components";

import CustomText from "./CustomText";
import { ICON_SIZE } from "../helpers/config/config";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ChevronIcon = (props: any) => (
  <Icon
    fill="#8F9BB3"
    style={styles.icon}
    {...props}
    name="chevron-down-outline"
  />
);

interface BaseTaskCardProps {
  task: string;
  deleted?: boolean;
  onLongPress?: () => void;
}

const BaseTaskCard: React.FC<BaseTaskCardProps> = ({
  task,
  deleted,
  onLongPress,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState(0);
  const spinValue = useRef(new Animated.Value(0)).current;

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

  const handleExpand = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(100, "linear", "opacity")
    );
    setExpanded(!expanded);
    spin();
  };

  return (
    <Pressable
      onPress={handleExpand}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
        },
        styles.container,
      ]}
    >
      <View style={styles.taskContainer}>
        <CustomText
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ textDecorationLine: deleted ? "line-through" : "none" }}
          numberOfLines={expanded ? null : 2}
          onTextLayout={({ nativeEvent: { lines } }) => {
            setTruncated(lines.length > 2);
            setNumberOfLines(lines.length);
          }}
        >
          {task}
        </CustomText>
        {numberOfLines < 2 && <CustomText />}
      </View>
      {truncated && (
        <Animated.View
          style={[styles.iconContainer, { transform: [{ rotate }] }]}
        >
          <ChevronIcon />
        </Animated.View>
      )}
    </Pressable>
  );
};

export default BaseTaskCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  taskContainer: {
    flex: 0.9,
  },
  iconContainer: {
    position: "absolute",
    right: 16,
  },
});
