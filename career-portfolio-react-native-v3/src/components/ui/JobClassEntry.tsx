import { useTheme } from "@react-navigation/native";
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Pressable, StyleSheet } from "react-native";

import type { JobClass } from "../../app/features/jobClass";
import { SPACING } from "../../resources";
import { ThemedText } from "../typography";

type JobClassEntryProps = {
  isSelected: boolean;
  onPress?: (item: JobClass) => void;
  jobClass: JobClass;
  style?: StyleProp<ViewStyle>;
};

export const JobClassEntry = ({
  isSelected,
  onPress,
  jobClass,
  style,
}: JobClassEntryProps) => {
  const { colors } = useTheme();

  const selectJobClass = () => {
    if (onPress) {
      onPress(jobClass);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: isSelected ? colors.secondary : "white",
          borderColor: isSelected ? colors.secondary : "lightgray",
          opacity: pressed && onPress ? 0.5 : 1,
        },
        styles.container,
        style,
      ]}
      onPress={selectJobClass}
    >
      <ThemedText
        style={[{ color: isSelected ? "white" : "black" }, styles.jobClassText]}
      >
        {jobClass.title}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.spacing12,
    borderRadius: SPACING.spacing16,
    borderWidth: 1,
  },
  jobClassText: {
    fontFamily: "regular",
  },
});
