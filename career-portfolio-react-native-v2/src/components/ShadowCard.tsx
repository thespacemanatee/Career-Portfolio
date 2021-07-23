import React from "react";
import { View, TouchableOpacity, ViewStyle } from "react-native";
import { StyleService } from "@ui-kitten/components";

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
  return (
    <TouchableOpacity
      style={styles.shadowContainer}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[style, styles.shadow]}>{children}</View>
    </TouchableOpacity>
  );
};

export default ShadowCard;

const styles = StyleService.create({
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
  },
  shadow: {
    borderRadius: 8,
    backgroundColor: "white",
    overflow: "hidden",
  },
});
