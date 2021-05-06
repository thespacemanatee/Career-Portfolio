import React, { useMemo, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { StyleService, Tooltip } from "@ui-kitten/components";

const TaskBarChartDemo = ({ notRelevant, similar, missing }) => {
  const [notRelevantVisible, setNotRelevantVisible] = useState(false);
  const [similarVisible, setSimilarVisible] = useState(false);
  const [missingVisible, setMissingVisible] = useState(false);

  const totalTasks = useMemo(
    () => notRelevant.length + similar.length + missing.length,
    [missing.length, notRelevant.length, similar.length]
  );

  const renderNotRelevant = () => (
    <TouchableOpacity
      style={[
        styles.notRelevant,
        { width: `${(notRelevant.length / totalTasks) * 100}%` },
      ]}
      onPress={() => {
        setNotRelevantVisible(true);
      }}
    />
  );

  const renderSimilar = () => (
    <TouchableOpacity
      style={[
        styles.similar,
        { width: `${(similar.length / totalTasks) * 100}%` },
      ]}
      onPress={() => {
        setSimilarVisible(true);
      }}
    />
  );

  const renderMissing = () => (
    <TouchableOpacity
      style={[
        styles.missing,
        { width: `${(missing.length / totalTasks) * 100}%` },
      ]}
      onPress={() => {
        setMissingVisible(true);
      }}
    />
  );

  return (
    <View style={styles.barChart}>
      <Tooltip
        anchor={renderNotRelevant}
        visible={notRelevantVisible}
        placement="bottom start"
        onBackdropPress={() => setNotRelevantVisible(false)}
        fullWidth
      >
        Your existing tasks that are not relevant to this occupation.
      </Tooltip>
      <Tooltip
        anchor={renderSimilar}
        visible={similarVisible}
        placement="bottom end"
        onBackdropPress={() => setSimilarVisible(false)}
      >
        Similar tasks
      </Tooltip>
      <Tooltip
        anchor={renderMissing}
        visible={missingVisible}
        placement="bottom end"
        onBackdropPress={() => setMissingVisible(false)}
      >
        Missing tasks
      </Tooltip>
    </View>
  );
};

export default TaskBarChartDemo;

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
