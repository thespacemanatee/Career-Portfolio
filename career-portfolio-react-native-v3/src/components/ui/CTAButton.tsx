import React from "react";
import type { PressableProps, StyleProp, ViewStyle } from "react-native";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import { FONT_SIZE, SPACING } from "../../resources";
import { ThemedText } from "../typography";

interface CTAButtonProps extends PressableProps {
  label: string;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const CTAButton = ({
  label,
  onPress,
  loading,
  disabled,
  style,
}: CTAButtonProps) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          backgroundColor: disabled ? "gray" : colors.primary,
          opacity: pressed ? 0.5 : 1,
        },
        styles.container,
        style,
      ]}
    >
      <ThemedText style={styles.labelText}>{label}</ThemedText>
      {loading && <ActivityIndicator color="white" style={styles.indicator} />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.spacing16,
    borderRadius: SPACING.spacing16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelText: {
    color: "white",
    fontFamily: "bold",
    fontSize: FONT_SIZE.large,
  },
  indicator: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "flex-end",
    marginHorizontal: SPACING.spacing16,
  },
});
