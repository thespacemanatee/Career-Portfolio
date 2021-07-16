import React from "react";
import { View, StyleSheet, Platform, TextInputProps } from "react-native";
import { Input, Spinner, useTheme } from "@ui-kitten/components";

import CustomText from "./CustomText";

interface CustomTextInputProps extends TextInputProps {
  errorText?: string;
  description?: string;
  label?: string;
  size?: string;
  loading?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  errorText,
  description,
  label,
  size,
  loading,
  ...props
}) => {
  const theme = useTheme();

  return (
    <View>
      <Input
        {...props}
        label={label}
        size={size}
        status={errorText ? "danger" : "basic"}
        accessoryRight={() => (loading ? <Spinner /> : null)}
      />
      {description && !errorText ? (
        <CustomText
          style={[styles.description, { color: theme["color-basic-600"] }]}
        >
          {description || " "}
        </CustomText>
      ) : null}
      <CustomText style={[styles.error, { color: theme["color-danger-700"] }]}>
        {errorText || " "}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
    paddingTop: 8,
    position: Platform.OS !== "web" ? "absolute" : "relative",
    bottom: 0,
  },
  error: {
    fontSize: 12,
    paddingTop: 8,
  },
});

export default CustomTextInput;
