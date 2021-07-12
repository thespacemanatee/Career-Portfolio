import React from "react";
import { Animated, TextProps } from "react-native";
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
  numberOfLines,
  style,
}) => {
  return (
    <Animated.Text
      numberOfLines={numberOfLines}
      style={[style, { fontFamily: fontWeights[fontFamily || "semiBold"] }]}
    >
      {children}
    </Animated.Text>
  );
};

export default CustomText;
