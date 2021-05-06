import React from "react";
import { StyleSheet, View, Animated, useWindowDimensions } from "react-native";

const Circle = ({
  scrollOffsetAnimatedValue,
  data,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
}) => {
  const { width } = useWindowDimensions();
  const CIRCLE_SIZE = width * 0.6;

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({ color }, index) => {
        const inputRange = [0, 0.5, 0.99];
        const inputRangeOpacity = [0, 0.5, 0.99];
        const scale = scrollOffsetAnimatedValue.interpolate({
          inputRange,
          outputRange: [1, 0, 1],
          extrapolate: "clamp",
        });

        const opacity = scrollOffsetAnimatedValue.interpolate({
          inputRange: inputRangeOpacity,
          outputRange: [0.2, 0, 0.2],
        });

        return (
          <Animated.View
            key={String(index)}
            style={[
              styles.circle,
              {
                backgroundColor: color,
                opacity,
                transform: [{ scale }],
                width: CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                borderRadius: CIRCLE_SIZE / 2,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Circle;

const styles = StyleSheet.create({
  circleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    top: "15%",
  },
});
