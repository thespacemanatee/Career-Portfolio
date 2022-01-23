import React from "react";
import type { TextProps } from "react-native";
import { StyleSheet, Text } from "react-native";

export const ThemedText = (props: TextProps) => {
  return (
    <Text style={[styles.text, props.style]} {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "regular",
  },
});
