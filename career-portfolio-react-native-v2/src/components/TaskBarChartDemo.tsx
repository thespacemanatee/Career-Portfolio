import React, { useMemo, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { StyleService, Tooltip } from "@ui-kitten/components";
import Colors from "../helpers/color";

interface TaskBarChartDemoProps {
  notRelevant: number;
  similar: number;
  missing: number;
  occupation: string;
  onSelectCategory: (type: string, occupation: string) => void;
}

const TaskBarChartDemo: React.FC<TaskBarChartDemoProps> = ({
  notRelevant,
  similar,
  missing,
}) => {
  const [notRelevantVisible, setNotRelevantVisible] = useState(false);
  const [similarVisible, setSimilarVisible] = useState(false);
  const [missingVisible, setMissingVisible] = useState(false);

  const totalTasks = useMemo(
    () => notRelevant + similar + missing,
    [missing, notRelevant, similar]
  );

  const renderNotRelevant = () => (
    <TouchableOpacity
      style={[
        styles.notRelevant,
        { width: `${(notRelevant / totalTasks) * 100}%` },
      ]}
      onPress={() => {
        setNotRelevantVisible(true);
      }}
    />
  );

  const renderSimilar = () => (
    <TouchableOpacity
      style={[styles.similar, { width: `${(similar / totalTasks) * 100}%` }]}
      onPress={() => {
        setSimilarVisible(true);
      }}
    />
  );

  const renderMissing = () => (
    <TouchableOpacity
      style={[styles.missing, { width: `${(missing / totalTasks) * 100}%` }]}
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
