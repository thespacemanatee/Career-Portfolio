import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={[styles.container, style]}>
      <BackButton onPress={onBackPress} />
      <View style={styles.titleContainer}>
        <ThemedText style={styles.titleText}>{title}</ThemedText>
        <ThemedText style={styles.subtitleText}>{subtitle}</ThemedText>
      </View>
      <StarButton onPress={onStarPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.spacing16,
  },
  titleContainer: {
    flexShrink: 1,
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
  },
});