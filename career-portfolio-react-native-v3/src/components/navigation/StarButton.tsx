import React from "react";
import { useTheme } from "@react-navigation/native";
import type { StyleProp, ViewStyle } from "react-native";

import { Star } from "../icons";
import { NavigationButton } from "../ui";

type StarButtonProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const StarButton = ({ onPress, style }: StarButtonProps) => {
  const { colors } = useTheme();

  return (
    <NavigationButton onPress={onPress} style={style}>
      <Star color={colors.secondary} />
    </NavigationButton>
  );
};
