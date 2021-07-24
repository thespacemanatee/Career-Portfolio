import { useTheme } from "@ui-kitten/components";
import React from "react";
import { TouchableOpacity, ViewProps, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

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
    <AnimatedTouchableOpacity
      onPress={handleGoBack}
      style={[styles.button, style]}
    >
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

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
  },
});
