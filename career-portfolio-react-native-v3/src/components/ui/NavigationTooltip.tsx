import React from "react";
import type { ViewProps } from "react-native";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "../typography";

const TOOLTIP_WIDTH = 225;

interface NavigationTooltipProps extends ViewProps {
  text?: string;
  visible?: boolean;
}

export const NavigationTooltip = ({
  text,
  visible,
  style,
}: NavigationTooltipProps) => {
  return visible ? (
    <View style={[styles.container, style]}>
      <ThemedText style={styles.tooltipText}>{text}</ThemedText>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(80, 93, 104, 0.4)",
    width: TOOLTIP_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  tooltipText: {
    color: "white",
  },
});
