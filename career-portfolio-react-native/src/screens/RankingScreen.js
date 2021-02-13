import React, { useCallback, useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

import DefaultScreen from "../components/ui/DefaultScreen";
import TaskTile from "../components/TaskTile";

const RankingScreen = (props) => {
  const storeTasks = useSelector((state) => state.tasks.tasks);
  const storeLifeTasks = useSelector((state) => state.tasks.lifeTasks);
  const [combinedTasks, setCombinedTasks] = useState([]);

  const renderTaskTiles = useCallback(
    ({ item, index, drag, isActive }) => {
      return (
        <TaskTile onLongPress={drag} checkBoxEnabled={false}>
          {item.task}
        </TaskTile>
      );
    },
    [combinedTasks]
  );

  useEffect(() => {
    setCombinedTasks(storeTasks.concat(storeLifeTasks));
  }, [storeTasks, storeLifeTasks]);

  return (
    <DefaultScreen title="Rank your tasks!">
      <DraggableFlatList
        data={combinedTasks}
        renderItem={renderTaskTiles}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({ data }) => setCombinedTasks(data)}
      />
    </DefaultScreen>
  );
};

export default RankingScreen;

const styles = StyleSheet.create({});
