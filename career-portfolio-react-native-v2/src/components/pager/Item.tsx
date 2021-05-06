import React from "react";
import { StyleSheet, Animated } from "react-native";

const Item = ({
  scrollOffsetAnimatedValue,
  children,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
  children: React.ReactNode;
}) => {
  const inputRangeOpacity = [0, 0.5, 0.99];

  const opacity = scrollOffsetAnimatedValue.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [1, 0, 1],
  });

  return (
    <Animated.View style={[styles.itemStyle, { opacity }]}>
      {children}
    </Animated.View>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemStyle: {
    flex: 1,
  },
});
