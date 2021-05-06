import React from "react";
import { StyleSheet, View, Animated, useWindowDimensions } from "react-native";

const Item = ({
  heading,
  description,
  scrollOffsetAnimatedValue,
}: {
  description: string;
  heading: string;
  scrollOffsetAnimatedValue: Animated.Value;
}) => {
  const { width, height } = useWindowDimensions();

  const inputRangeOpacity = [0, 0.5, 0.99];

  const opacity = scrollOffsetAnimatedValue.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [1, 0, 1],
  });

  return (
    <View style={[styles.itemStyle, { width, height }]}>
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
            },
          ]}
        >
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              width: width * 0.75,
            },
          ]}
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  itemStyle: {
    // alignItems: "center",
    // justifyContent: "center",
  },
  textContainer: {
    // alignItems: "flex-start",
    // alignSelf: "flex-end",
    flex: 0.5,
  },
  heading: {
    color: "#444",
    textTransform: "uppercase",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 5,
  },
  description: {
    color: "#ccc",
    fontWeight: "600",
    textAlign: "left",
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
});
