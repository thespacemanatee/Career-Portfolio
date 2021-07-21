import { useTheme } from "@ui-kitten/components";
import React, { useMemo, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { PieChart } from "react-native-svg-charts";
import CustomText from "../../components/CustomText";
import ResultTaskCard from "../../components/result/ResultTaskCard";
import ThemedBackButton from "../../components/ThemedBackButton";
import { sortByOccurrences } from "../../helpers/utils";

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
    <View style={styles.screen}>
      <ThemedBackButton navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
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
        {selectedIndex !== null &&
          sortByOccurrences(data[selectedIndex].tasks).map((task, idx) => (
            <ResultTaskCard
              key={`${task}-${Math.random()}`}
              index={idx}
              task={task}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default ResultsDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  pieChart: {
    height: 200,
    margin: 16,
  },
  pieChartChild: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    fontSize: 32,
  },
});
