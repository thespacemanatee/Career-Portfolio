import React from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../../CustomText";

const DOT_SIZE = 8;

interface PieChartLegendEntryProps {
  label: string;
  value: number;
  color: string;
}

const PieChartLegendEntry: React.FC<PieChartLegendEntryProps> = ({
  label,
  value,
  color,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.symbol}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <CustomText fontFamily="regular">{label}</CustomText>
      </View>
      <CustomText>{value}</CustomText>
    </View>
  );
};

export default PieChartLegendEntry;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  symbol: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    marginRight: 12,
  },
});
