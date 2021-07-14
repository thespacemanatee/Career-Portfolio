import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import {
  StyleService,
  Button,
  TopNavigationAction,
  Icon,
} from "@ui-kitten/components";
import DraggableFlatList from "react-native-draggable-flatlist";

import { setAllTasks, tasksSelector } from "../app/features/tasks/tasksSlice";
import alert from "../components/CustomAlert";
import CustomText from "../components/CustomText";
import RankingCard from "../components/RankingCard";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ResultsPayload } from "../types";
import ListEmptyComponent from "../components/ListEmptyComponent";

const HelpIcon = (props: any) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const RankingsScreen = ({ navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const form = useAppSelector((state) => state.form);
  const [combinedTasks, setCombinedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);

  const dispatch = useAppDispatch();

  const handleHelp = () => {
    alert(
      "Help",
      "Drag and reorder each task to the top (most preferred) or bottom (least preferred)."
    );
  };

  const HelpAction = () => (
    <TopNavigationAction icon={HelpIcon} onPress={handleHelp} />
  );

  const handleSubmit = () => {
    const tasksArray = tasks.map((e) => {
      return {
        task: e.task,
        taskId: e.taskId,
        IWA_Title: e.IWA_Title,
        task_type: e.task_type,
      };
    });
    const payload: ResultsPayload = {
      ...form,
      task_list: tasksArray,
    };
    navigation.navigate("SubmitLoading", {
      payload,
    });
  };

  useEffect(() => {
    setDeletedTasks(tasks.filter((e) => e.deleted === true));
    setCombinedTasks(tasks.filter((e) => e.deleted !== true));
  }, [tasks]);

  const handleDragEnd = ({ data }) => {
    dispatch(setAllTasks(data.concat(deletedTasks)));
  };

  const renderTasks = useCallback(({ item, index, drag, isActive }) => {
    return <RankingCard taskObject={item} onLongPress={drag} />;
  }, []);

  const renderEmptyComponent = () => (
    <ListEmptyComponent label="NO TASKS FOUND" />
  );

  return (
    <View style={styles.screen}>
      <CustomText style={styles.title} fontFamily="bold">
        Rank your tasks in order of preference.
      </CustomText>
      <DraggableFlatList
        style={styles.flatList}
        renderItem={renderTasks}
        data={combinedTasks}
        keyExtractor={(item) => String(item.taskId)}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={renderEmptyComponent}
        onDragEnd={handleDragEnd}
      />
      <Button onPress={handleSubmit}>SUBMIT</Button>
    </View>
  );
};

export default RankingsScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
  title: {
    fontSize: 26,
  },
  flatList: {
    marginVertical: 5,
  },
  contentContainer: {
    flexGrow: 1,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
