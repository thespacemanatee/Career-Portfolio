import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import { FONT_SIZE, SPACING } from "../../resources";
import { ThemedText } from "../typography";
import { NAV_BUTTON_SIZE } from "../ui/NavigationButton";
import { NavigationTooltip } from "../ui/NavigationTooltip";

import { BackButton } from "./BackButton";
import { StarButton } from "./StarButton";

type NavigationHeaderProps = {
  title: string;
  subtitle?: string;
  onBackPress?: () => void;
  onStarPress?: () => void;
  tooltipText?: string;
  tooltipVisible?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const NavigationHeader = ({
  title,
  subtitle,
  tooltipText,
  tooltipVisible,
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
      <View style={styles.actionContainer}>
        <StarButton onPress={onStarPress} />
        <NavigationTooltip
          text={tooltipText}
          visible={tooltipVisible}
          style={styles.tooltip}
        />
      </View>
    </View>
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
  actionContainer: {
    flexDirection: "row-reverse",
  },
  tooltip: {
    position: "absolute",
    top: NAV_BUTTON_SIZE,
    padding: SPACING.spacing8,
    borderRadius: SPACING.spacing8,
    marginTop: SPACING.spacing8,
  },
});
