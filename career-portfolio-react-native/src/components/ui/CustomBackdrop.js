import React, { useMemo } from "react";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style }) => {
  // animated variables
  const animatedOpacity = useMemo(
    () =>
      interpolate(animatedIndex, {
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
      }),
    [animatedIndex]
  );

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#a8b5eb",
        opacity: animatedOpacity,
      },
    ],
    [style, animatedOpacity]
  );

  return <Animated.View style={containerStyle} />;
};

export default CustomBackdrop;
