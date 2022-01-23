import React from "react";
import { useTheme } from "@react-navigation/native";
import type { StyleProp, ViewStyle } from "react-native";

import { ChevronLeft } from "../icons";
import { NavigationButton } from "../ui";

type BackButtonProps = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const BackButton = ({ onPress, style }: BackButtonProps) => {
  const { colors } = useTheme();

  return (
    <NavigationButton onPress={onPress} style={style}>
      <ChevronLeft color={colors.primary} />
    </NavigationButton>
  );
};
