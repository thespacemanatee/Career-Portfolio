import React from "react";
import { useTheme } from "@ui-kitten/components";
import { StyleSheet, View, ViewProps } from "react-native";

import CustomText from "./CustomText";

interface SelectedOccupationCardProps extends ViewProps {
  occupation: string;
  numberOfLines?: number;
}

const SelectedOccupationCard: React.FC<SelectedOccupationCardProps> = ({
  occupation,
  numberOfLines,
  style,
}) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        style,
        { backgroundColor: theme["color-basic-600"] },
      ]}
    >
      <CustomText fontFamily="bold" style={styles.titleText}>
        Current Selection
      </CustomText>
      <CustomText
        fontFamily="extraBold"
        style={styles.subtitleText}
        numberOfLines={numberOfLines}
      >
        {occupation}
      </CustomText>
    </View>
  );
};

export default SelectedOccupationCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 12,
  },
  titleText: {
    color: "white",
    fontSize: 14,
  },
  subtitleText: {
    color: "white",
    fontSize: 24,
  },
});
