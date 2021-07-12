import React from "react";
import { Animated, StyleProp, TextStyle } from "react-native";
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

interface CustomTextProps {
  children: React.ReactChild;
  fontFamily: FontWeight;
  style?: StyleProp<TextStyle>;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  fontFamily,
  style,
}) => {
  return (
    <Animated.Text style={[style, { fontFamily: fontWeights[fontFamily] }]}>
      {children}
    </Animated.Text>
  );
};

export default CustomText;
