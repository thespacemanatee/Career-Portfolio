import React from "react";
import { StyleSheet } from "react-native";
import CustomText from "./CustomText";
import ShadowCard from "./ShadowCard";

const SelectedOccupationCard = ({ occupation }) => {
  return (
    <ShadowCard style={styles.selectedOccupation} disabled>
      <CustomText style={styles.selectedOccupationText} fontFamily="bold">
        Selected Occupation
      </CustomText>
      <CustomText style={styles.selectedOccupationText} numberOfLines={1}>
        {occupation || "Please choose an occupation"}
      </CustomText>
    </ShadowCard>
  );
};

export default SelectedOccupationCard;

const styles = StyleSheet.create({
  selectedOccupation: {
    padding: 20,
  },
  selectedOccupationText: {
    fontSize: 16,
  },
});
