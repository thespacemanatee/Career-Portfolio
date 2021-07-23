import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import ResultsPieChart from "../../components/result/pieChart/ResultsPieChart";
import ResultTaskCard from "../../components/result/ResultTaskCard";
import ThemedBackButton from "../../components/ThemedBackButton";
import { sortByOccurrences } from "../../helpers/utils";

const ResultsDetailsScreen = ({ route, navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const { data, scores } = route.params;

  const handlePressArc = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <View style={styles.screen}>
      <ThemedBackButton navigation={navigation} style={styles.backButton} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pieChartContainer}>
          <ResultsPieChart data={data} size={200} onPressArc={handlePressArc} />
        </View>
        {selectedIndex !== null &&
          sortByOccurrences(data[selectedIndex].tasks).map((task, idx) => (
            <View
              key={`${task}-${Math.random()}`}
              style={styles.resultTaskCard}
            >
              <ResultTaskCard index={idx} task={task} />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default ResultsDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backButton: {
    margin: 16,
  },
  pieChartContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  resultTaskCard: {
    paddingHorizontal: 16,
  },
});
