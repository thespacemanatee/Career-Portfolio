import { useTheme } from "@ui-kitten/components";
import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { PieChart } from "react-native-svg-charts";
import CustomText from "../../components/CustomText";

const labelTexts = ["Similar", "Missing", "Unrelated"];

const ResultsDetailsScreen = ({ route, navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const { data } = route.params;

  const theme = useTheme();

  const pieData = useMemo(() => {
    return data.map((object, index) => {
      return {
        value: object.tasks.length,
        svg: {
          fill:
            selectedIndex === index ? theme["color-primary-500"] : object.color,
          onPress: () => {
            setSelectedIndex(index);
          },
        },
        key: `${index}`,
        arc: { outerRadius: selectedIndex === index ? "110%" : "100%" },
      };
    });
  }, [data, selectedIndex, theme]);

  return (
    <View>
      <PieChart
        data={pieData}
        style={styles.pieChart}
        innerRadius="70%"
        outerRadius="90%"
      >
        <View style={styles.pieChartChild}>
          <CustomText style={styles.progressText}>
            {data[selectedIndex].tasks.length}
          </CustomText>
          <CustomText>{`${labelTexts[selectedIndex]} Tasks`}</CustomText>
        </View>
      </PieChart>
    </View>
  );
};

export default ResultsDetailsScreen;

const styles = StyleSheet.create({
  pieChart: {
    height: 200,
  },
  pieChartChild: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    fontSize: 32,
  },
});
