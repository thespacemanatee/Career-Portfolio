import React from "react";
import { StyleSheet, View, Animated } from "react-native";

import CustomText from "../CustomText";
import { ResultsViewPagerConfig } from "../../types";

const TICKER_HEIGHT = 36;

const Ticker = ({
  scrollOffsetAnimatedValue,
  positionAnimatedValue,
  config,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
  config: ResultsViewPagerConfig[];
}) => {
  const inputRange = [0, config.length];
  const translateY = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, config.length * -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {config.map((item, index) => {
          return (
            <CustomText
              key={String(index)}
              fontFamily="bold"
              style={{
                ...styles.tickerText,
                color: item.color,
              }}
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
    fontSize: TICKER_HEIGHT - 2,
    lineHeight: TICKER_HEIGHT,
    textTransform: "uppercase",
  },
});
