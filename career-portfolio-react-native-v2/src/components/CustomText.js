import React from "react";
import { Animated } from "react-native";

const CustomText = ({ children, ...props }) => {
  return (
    <Animated.Text
      {...props}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...props.style,
        fontFamily: props.bold ? "SFProDisplay-Bold" : "SFProDisplay-Regular",
      }}
    >
      {children}
    </Animated.Text>
  );
};

export default CustomText;
