import React, { useState } from "react";
import type { TextInputProps } from "react-native";
import { Keyboard, View, StyleSheet, TextInput } from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SPACING } from "../../resources";

export const SearchTextInput = ({
  value,
  onChangeText,
  style,
}: TextInputProps) => {
  const [focused, setFocused] = useState(false);
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: focused ? colors.secondary : undefined,
          borderColor: focused ? "white" : "lightgray",
        },
        styles.container,
      ]}
    >
      <MaterialCommunityIcons
        name="magnify"
        size={24}
        color={focused ? "white" : "lightgray"}
      />
      <TextInput
        value={value}
        placeholder="Enter your occupation"
        placeholderTextColor={focused ? "white" : "lightgray"}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onSubmitEditing={Keyboard.dismiss}
        returnKeyType="search"
        style={[
          {
            backgroundColor: focused ? colors.secondary : undefined,
            color: focused ? "white" : "gray",
          },
          styles.textInput,
          style,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: SPACING.spacing8,
    padding: SPACING.spacing12,
  },
  textInput: {
    flex: 1,
    fontFamily: "semiBold",
    paddingLeft: SPACING.spacing12,
  },
});
