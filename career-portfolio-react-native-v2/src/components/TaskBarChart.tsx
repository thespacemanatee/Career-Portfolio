import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { StyleService } from "@ui-kitten/components";
import { ResultsMissingData, ResultsSimilarData, RESULTS_TYPE } from "../types";
import Colors from "../helpers/color";

const TaskBarChart = ({
  notRelevant,
  similar,
  missing,
  occupation,
  onSelectCategory,
}: {
  notRelevant: number;
  similar: ResultsSimilarData[];
  missing: ResultsMissingData[];
  occupation: string;
  onSelectCategory: (type: string, occupation: string) => void;
}) => {
  const totalTasks = useMemo(
    () => notRelevant + similar.length + missing.length,
    [missing.length, notRelevant, similar.length]
  );

  const handleSelectCategory = (type: string) => {
    onSelectCategory(type, occupation);
  };

  return (
    <View style={styles.barChart}>
      <TouchableOpacity
        style={[
          styles.notRelevant,
          { width: `${(notRelevant / totalTasks) * 100}%` },
        ]}
        onPress={() => {
          handleSelectCategory(RESULTS_TYPE.NOT_RELEVANT);
        }}
      />

      <TouchableOpacity
        style={[
          styles.similar,
          { width: `${(similar.length / totalTasks) * 100}%` },
        ]}
        onPress={() => {
          handleSelectCategory(RESULTS_TYPE.SIMILAR);
        }}
      />
      <TouchableOpacity
        style={[
          styles.missing,
          { width: `${(missing.length / totalTasks) * 100}%` },
        ]}
        onPress={() => {
          handleSelectCategory(RESULTS_TYPE.MISSING);
        }}
      />
    </View>
  );
};

export default TaskBarChart;

const styles = StyleService.create({
  barChart: {
    height: 35,
    flexDirection: "row",
  },
  notRelevant: {
    backgroundColor: Colors.NOT_RELEVANT,
  },
  similar: {
    backgroundColor: Colors.SIMILAR,
  },
  missing: {
    backgroundColor: Colors.MISSING,
  },
});
