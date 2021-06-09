import React from "react";
import { View, useWindowDimensions } from "react-native";

import RoundedButton from "./RoundedButton";

const Footer = ({
  backgroundColor,
  leftButtonLabel = false,
  leftButtonPress = false,
  rightButtonLabel = false,
  rightButtonPress = false,
}) => {
  const { width } = useWindowDimensions();
  const HEIGHT = width * 0.21;
  const FOOTER_PADDING = width * 0.1;

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flexDirection: "row",
        justifyContent: leftButtonLabel ? "space-between" : "flex-end",
        height: HEIGHT,
        backgroundColor,
        opacity: 0.6,
        alignItems: "center",
        paddingHorizontal: FOOTER_PADDING,
      }}
    >
      {leftButtonLabel && (
        <RoundedButton label={leftButtonLabel} onPress={leftButtonPress} />
      )}
      <RoundedButton label={rightButtonLabel} onPress={rightButtonPress} />
    </View>
  );
};

export default Footer;
