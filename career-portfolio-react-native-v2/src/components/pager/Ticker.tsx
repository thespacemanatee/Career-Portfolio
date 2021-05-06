import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import CustomText from "../CustomText";

const TICKER_HEIGHT = 36;

const Ticker = ({
  scrollOffsetAnimatedValue,
  positionAnimatedValue,
  data,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
}) => {
  const inputRange = [0, data.length];
  const translateY = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, data.length * -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <CustomText
              bold
              key={String(index)}
              style={{ ...styles.tickerText, color: item.color }}
            >
              {item.type}
            </CustomText>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default Ticker;

const styles = StyleSheet.create({
  tickerContainer: {
    overflow: "hidden",
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: "uppercase",
  },
});
