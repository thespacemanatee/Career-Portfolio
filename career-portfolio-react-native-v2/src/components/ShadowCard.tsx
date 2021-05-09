import React from "react";
import { View, TouchableOpacity, Platform, ViewStyle } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";

interface ShadowCardProps {
  style?: ViewStyle;
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

const ShadowCard = ({
  style,
  children,
  onPress,
  disabled,
}: ShadowCardProps) => {
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

ShadowCard.defaultProps = {
  style: null,
  onPress: null,
  disabled: false,
};

export default ShadowCard;

const themedStyles = StyleService.create({
  shadowContainer: {
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderRadius: 20,
    marginBottom: 10,
  },
  shadow: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Platform.select({
      web: "#FAFAFA",
      ios: "white",
      android: "white",
    }),
  },
});
