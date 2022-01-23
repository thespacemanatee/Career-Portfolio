import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import { FONT_SIZE, SPACING } from "../../resources";
import { ThemedText } from "../typography";

import { BackButton, StarButton } from ".";

type NavigationHeaderProps = {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  onStarPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const NavigationHeader = ({
  title,
  subtitle,
  onBackPress,
  onStarPress,
  style,
}: NavigationHeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <BackButton onPress={onBackPress} />
      <View style={styles.titleContainer}>
        <ThemedText style={styles.titleText}>{title}</ThemedText>
        <ThemedText style={styles.subtitleText}>{subtitle}</ThemedText>
      </View>
      <StarButton onPress={onStarPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.spacing32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "bold",
    fontSize: FONT_SIZE.large,
  },
  subtitleText: {
    opacity: 0.7,
    textAlign: "center",
    fontSize: FONT_SIZE.small,
    maxWidth: "60%",
  },
});
