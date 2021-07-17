import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { StyleService, Button, useTheme } from "@ui-kitten/components";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useFocusEffect } from "@react-navigation/native";

import { setAllTasks, tasksSelector } from "../app/features/tasks/tasksSlice";
import CustomText from "../components/CustomText";
import RankingCard from "../components/RankingCard";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ResultsPayload } from "../types";
import ListEmptyComponent from "../components/ListEmptyComponent";
import SectionTitle from "../components/SectionTitle";
import { submissionProgressRef } from "../navigation/NavigationHelper";

const RankingsScreen = ({ route, navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const form = useAppSelector((state) => state.form);
  const [combinedTasks, setCombinedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);

  const { id } = route.params || {};

  const dispatch = useAppDispatch();

  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      submissionProgressRef.current = 3;
    }, [])
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
    submissionProgressRef.current += 1;
    navigation.navigate("SubmitLoading", {
      payload,
      id,
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
      <SectionTitle title="Rank your tasks in order of preference.">
        <CustomText style={styles.subtitle} fontFamily="semiBold">
          Drag and{" "}
          <CustomText style={{ color: theme["color-primary-500"] }}>
            reorder
          </CustomText>{" "}
          each task to the top (most preferred) or bottom (least preferred).
        </CustomText>
      </SectionTitle>
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
    padding: 16,
  },
  subtitle: {
    fontSize: 14,
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
