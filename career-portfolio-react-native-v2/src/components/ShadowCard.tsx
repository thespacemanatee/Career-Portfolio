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
    <View needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
      <TouchableOpacity
        style={styles.shadowContainer}
        activeOpacity={0.5}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={[style, styles.shadow]}>{children}</View>
      </TouchableOpacity>
    </View>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
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
