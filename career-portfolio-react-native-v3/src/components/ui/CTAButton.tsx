import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import { FONT_SIZE, SPACING } from "../../resources";
import { ThemedText } from "../typography";

type CTAButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export const CTAButton = ({ label, onPress, style }: CTAButtonProps) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { backgroundColor: colors.primary, opacity: pressed ? 0.5 : 1 },
        styles.container,
        style,
      ]}
    >
      <ThemedText style={styles.labelText}>{label}</ThemedText>
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
});
