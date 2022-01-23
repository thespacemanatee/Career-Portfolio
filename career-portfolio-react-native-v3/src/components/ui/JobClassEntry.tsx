import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import type { JobClass } from "../../app/features/jobClass";
import { SPACING } from "../../resources";
import { ThemedText } from "../typography";

type JobClassEntryProps = {
  jobClass: JobClass;
  style: StyleProp<ViewStyle>;
};

export const JobClassEntry = ({ jobClass, style }: JobClassEntryProps) => {
  return (
    <View style={[styles.container, style]}>
      <ThemedText>{jobClass.title}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.spacing12,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: SPACING.spacing16,
  },
});
