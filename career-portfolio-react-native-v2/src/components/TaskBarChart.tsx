import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { StyleService } from "@ui-kitten/components";
import { ResultsMissingData, ResultsSimilarData } from "../types";
import Colors from "../helpers/color";

const TaskBarChart = ({
  notRelevant,
  similar,
  missing,
}: {
  notRelevant: number;
  similar: ResultsSimilarData[];
  missing: ResultsMissingData[];
}) => {
  const totalTasks = useMemo(
    () => notRelevant + similar.length + missing.length,
    [missing.length, notRelevant, similar.length]
  );

  return (
    <View style={styles.barChart}>
      <TouchableOpacity
        style={[
          styles.notRelevant,
          { width: `${(notRelevant / totalTasks) * 100}%` },
        ]}
        onPress={() => {}}
      />

      <TouchableOpacity
        style={[
          styles.similar,
          { width: `${(similar.length / totalTasks) * 100}%` },
        ]}
        onPress={() => {}}
      />
      <TouchableOpacity
        style={[
          styles.missing,
          { width: `${(missing.length / totalTasks) * 100}%` },
        ]}
        onPress={() => {}}
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
