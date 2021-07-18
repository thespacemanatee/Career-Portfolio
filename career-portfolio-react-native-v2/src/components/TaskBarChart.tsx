import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { StyleService } from "@ui-kitten/components";
import { ResultsType } from "../types";
import Colors from "../helpers/config/color";

interface TaskBarChartProps {
  notRelevant: number;
  similar: number;
  missing: number;
  occupation: string;
  onSelectCategory: (type: string, occupation: string) => void;
}

const TaskBarChart: React.FC<TaskBarChartProps> = ({
  notRelevant,
  similar,
  missing,
  occupation,
  onSelectCategory,
}) => {
  const totalTasks = useMemo(
    () => notRelevant + similar + missing,
    [missing, notRelevant, similar]
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
          handleSelectCategory(ResultsType.IRRELEVANT);
        }}
      />
      <TouchableOpacity
        style={[styles.similar, { width: `${(similar / totalTasks) * 100}%` }]}
        onPress={() => {
          handleSelectCategory(ResultsType.SIMILAR);
        }}
      />
      <TouchableOpacity
        style={[styles.missing, { width: `${(missing / totalTasks) * 100}%` }]}
        onPress={() => {
          handleSelectCategory(ResultsType.MISSING);
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
    borderRadius: 8,
    overflow: "hidden",
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
