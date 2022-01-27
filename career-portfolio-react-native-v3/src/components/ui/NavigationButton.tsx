import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { View, Pressable, StyleSheet } from "react-native";

export const NAV_BUTTON_SIZE = 44;

type NavigationButton = {
  onPress?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const NavigationButton = ({
  onPress,
  children,
  style,
}: NavigationButton) => {
  if (!onPress) {
    return <View style={[styles.empty, style]} />;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        styles.container,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: NAV_BUTTON_SIZE,
    height: NAV_BUTTON_SIZE,
    borderRadius: NAV_BUTTON_SIZE / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  empty: {
    width: NAV_BUTTON_SIZE,
    height: NAV_BUTTON_SIZE,
  },
});
