import React, { useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { StyleService } from "@ui-kitten/components";

const TaskBarChart = ({ notRelevant, similar, missing }) => {
  const totalTasks = useMemo(
    () => notRelevant.length + similar.length + missing.length,
    [missing.length, notRelevant.length, similar.length]
  );

  return (
    <View style={styles.barChart}>
      <TouchableOpacity
        style={[
          styles.notRelevant,
          { width: `${(notRelevant.length / totalTasks) * 100}%` },
        ]}
      />
      <TouchableOpacity
        style={[
          styles.similar,
          { width: `${(similar.length / totalTasks) * 100}%` },
        ]}
      />
      <TouchableOpacity
        style={[
          styles.missing,
          { width: `${(missing.length / totalTasks) * 100}%` },
        ]}
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
    backgroundColor: "yellow",
  },
  similar: {
    backgroundColor: "green",
  },
  missing: {
    backgroundColor: "red",
  },
});
