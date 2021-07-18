import { useTheme } from "@ui-kitten/components";
import React from "react";
import { TouchableOpacity, ViewProps } from "react-native";
import Animated from "react-native-reanimated";
import { navigationRef } from "../navigation/NavigationHelper";
import CustomText from "./CustomText";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface ThemedBackButtonProps extends ViewProps {
  label?: string;
  navigation: any;
}

const ThemedBackButton: React.FC<ThemedBackButtonProps> = ({
  style,
  label,
  navigation,
}) => {
  const theme = useTheme();

  const handleGoBack = () => {
    navigation.goBack();
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
