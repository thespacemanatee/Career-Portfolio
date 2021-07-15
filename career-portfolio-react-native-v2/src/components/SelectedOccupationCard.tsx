import React from "react";
import { useTheme } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

import CustomText from "./CustomText";

const SelectedOccupationCard = ({ occupation }) => {
  const theme = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme["color-basic-600"] }]}
    >
      <CustomText fontFamily="bold" style={styles.titleText}>
        Current Selection
      </CustomText>
      <CustomText
        fontFamily="extraBold"
        style={styles.subtitleText}
        numberOfLines={2}
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
