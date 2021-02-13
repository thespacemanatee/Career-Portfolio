import React, { useCallback, useState, useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DraggableFlatList from "react-native-draggable-flatlist";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import CustomHeaderButton from "../components/ui/CustomHeaderButton";
import DefaultScreen from "../components/ui/DefaultScreen";
import TaskTile from "../components/TaskTile";
import * as taskActions from "../store/actions/task";

const RankingScreen = ({ route, navigation }) => {
  const storeTasks = useSelector((state) => state.tasks.tasks);
  const storeLifeTasks = useSelector((state) => state.tasks.lifeTasks);
  const combinedTasks = useSelector((state) => state.tasks.combinedTasks);
  //   const [combinedTasks, setCombinedTasks] = useState([]);

  const dispatch = useDispatch();

  const savePreferencesToStore = useCallback((result) => {
    dispatch(taskActions.addCombinedTasks(result));
  }, []);

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
    const tempArray = storeTasks.concat(storeLifeTasks);
    savePreferencesToStore(tempArray);
  }, [storeTasks, storeLifeTasks]);

  //   useEffect(() => {
  //     savePreferencesToStore();
  //   }, [combinedTasks]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Help"
            iconName="help-circle-outline"
            onPress={() => {
              Alert.alert(
                "Help",
                "Drag and reorder each task to the top (most preferred) or bottom (least preferred).",
                [{ text: "OK" }]
              );
            }}
          />
        </HeaderButtons>
      ),
    });
  });

  return (
    <DefaultScreen title="Rank your tasks!">
      <DraggableFlatList
        data={combinedTasks}
        renderItem={renderTaskTiles}
        keyExtractor={(item, index) => index.toString()}
        onDragEnd={({ data }) => {
          savePreferencesToStore(data);
        }}
      />
    </DefaultScreen>
  );
};

export default RankingScreen;

const styles = StyleSheet.create({});
