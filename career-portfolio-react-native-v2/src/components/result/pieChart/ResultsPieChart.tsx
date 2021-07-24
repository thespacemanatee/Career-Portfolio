import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import { PieChart } from "react-native-svg-charts";

import { ResultsPieChartData } from "../../../types";
import CustomText from "../../CustomText";

interface ResultsPieChartProps {
  data: ResultsPieChartData[];
  size: number;
  onPressArc?: (index: number) => void;
}

const labelTexts = ["Similar", "Missing", "Unrelated"];

const ResultsPieChart: React.FC<ResultsPieChartProps> = ({
  data,
  size,
  onPressArc,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(onPressArc && 0);
  const pieData = useMemo(() => {
    return data.map((object, index) => ({
      value: object.tasks.length,
      svg: {
        fill: object.color,
        ...(onPressArc && {
          onPress: () => {
            setSelectedIndex(index);
            onPressArc(index);
          },
        }),
      },
      key: `${index}`,
      arc: { outerRadius: selectedIndex === index ? "110%" : "100%" },
    }));
  }, [data, onPressArc, selectedIndex]);
  return (
    <PieChart
      data={pieData}
      style={{ height: size, width: size }}
      innerRadius="70%"
      outerRadius="90%"
    >
      {onPressArc && (
        <View style={styles.pieChartChild}>
          <CustomText style={styles.progressText}>
            {data[selectedIndex].tasks.length}
          </CustomText>
          <CustomText>{`${labelTexts[selectedIndex]} Tasks`}</CustomText>
        </View>
      )}
    </PieChart>
  );
};

export default ResultsPieChart;

const styles = StyleSheet.create({
  pieChartChild: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    fontSize: 32,
  },
});
