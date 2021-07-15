import { useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { navigationRef } from "../navigation/NavigationHelper";
import CustomText from "./CustomText";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface ThemedBackButtonProps {
  style?: StyleProp<ViewStyle>;
  label?: string;
}

const ThemedBackButton: React.FC<ThemedBackButtonProps> = ({
  style,
  label,
}) => {
  const theme = useTheme();

  const handleGoBack = () => {
    navigationRef.current.goBack();
  };

  return (
    <AnimatedTouchableOpacity onPress={handleGoBack} style={style}>
      <CustomText
        fontFamily="medium"
        style={{ color: theme["color-primary-500"] }}
      >
        {label || "Back"}
      </CustomText>
    </AnimatedTouchableOpacity>
  );
};

export default ThemedBackButton;
