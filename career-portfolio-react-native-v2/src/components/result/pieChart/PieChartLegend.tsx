import React from "react";
import { StyleSheet, View } from "react-native";
import { ResultsPieChartData } from "../../../types";
import PieChartLegendEntry from "./PieChartLegendEntry";

interface PieChartLegendProps {
  data: ResultsPieChartData[];
}

const labels = ["Similar", "Missing", "Specific to Current Job"];

const PieChartLegend: React.FC<PieChartLegendProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((type, index) => {
        return (
          <PieChartLegendEntry
            key={labels[index]}
            label={labels[index]}
            value={type.tasks.length}
            color={type.color}
          />
        );
      })}
    </View>
  );
};

export default PieChartLegend;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
