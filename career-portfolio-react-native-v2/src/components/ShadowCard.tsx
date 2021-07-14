import React from "react";
import { View, TouchableOpacity, Platform, ViewStyle } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

interface ShadowCardProps {
  style?: ViewStyle;
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

const ShadowCard: React.FC<ShadowCardProps> = ({
  style,
  children,
  onPress,
  disabled,
}) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <TouchableOpacity
      style={styles.shadowContainer}
      activeOpacity={0.5}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[style, styles.shadow]}>{children}</View>
    </TouchableOpacity>
  );
};

export default ShadowCard;

const themedStyles = StyleService.create({
  shadowContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    margin: 8,
  },
  shadow: {
    borderRadius: 8,
    backgroundColor: "white",
  },
});
