import React from "react";
import { TextProps } from "react-native";
import Animated from "react-native-reanimated";

import { FontWeight } from "../types";

const fontWeights = {
  bold: "Manrope-Bold",
  semiBold: "Manrope-SemiBold",
  extraBold: "Manrope-ExtraBold",
  extraLight: "Manrope-ExtraLight",
  light: "Manrope-Light",
  medium: "Manrope-Medium",
  regular: "Manrope-Regular",
};

interface CustomTextProps extends TextProps {
  fontFamily?: FontWeight;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  fontFamily,
  style,
  ...props
}) => {
  return (
    <Animated.Text
      {...props}
      style={[style, { fontFamily: fontWeights[fontFamily || "semiBold"] }]}
    >
      {children}
    </Animated.Text>
  );
};

export default CustomText;
