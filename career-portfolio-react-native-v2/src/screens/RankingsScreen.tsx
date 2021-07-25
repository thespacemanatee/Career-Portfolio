import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { Divider, StyleService, useTheme } from "@ui-kitten/components";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useFocusEffect } from "@react-navigation/native";
import { useSharedValue } from "react-native-reanimated";

import { setAllTasks, tasksSelector } from "../app/features/tasks/tasksSlice";
import CustomText from "../components/CustomText";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ResultsPayload } from "../types";
import ListEmptyComponent from "../components/ListEmptyComponent";
import SectionTitle from "../components/SectionTitle";
import {
  navigationRef,
  submissionProgressRef,
} from "../navigation/NavigationHelper";
import BaseTaskCard from "../components/BaseTaskCard";
import AnimatedFab from "../components/AnimatedFab";

const RankingsScreen = ({ route, navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const form = useAppSelector((state) => state.form);
  const offsetY = useSharedValue(0);
  const showButton = useSharedValue(true);
  const [combinedTasks, setCombinedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);

  const { id, editing } = route.params || {};

  const dispatch = useAppDispatch();

  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      navigationRef.current = navigation;
      submissionProgressRef.current = 3;
    }, [navigation])
  );

  const handleSubmit = () => {
    const tasksArray = tasks.map((e) => ({
      task: e.task,
      taskId: e.taskId,
      IWA_Title: e.IWA_Title,
      task_type: e.task_type,
    }));
    const payload: ResultsPayload = {
      ...form,
      task_list: tasksArray,
      date: new Date().getTime(),
    };
    submissionProgressRef.current += 1;
    navigation.navigate("SubmitLoading", {
      payload,
      id,
      editing,
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
    return <BaseTaskCard task={item.task} onLongPress={drag} />;
  }, []);

  const renderEmptyComponent = () => (
    <ListEmptyComponent label="NO TASKS FOUND" />
  );

  const scrollHandler = (y: number) => {
    const currentOffset = y;
    showButton.value = !(currentOffset > 0 && currentOffset > offsetY.value);
    offsetY.value = currentOffset;
  };

  return (
    <View style={styles.screen}>
      <SectionTitle
        title="Rank your tasks in order of preference."
        style={styles.sectionTitle}
      >
        <CustomText style={styles.subtitle} fontFamily="semiBold">
          Drag and{" "}
          <CustomText style={{ color: theme["color-primary-500"] }}>
            reorder
          </CustomText>{" "}
          each task to the top (most preferred) or bottom (least preferred).
        </CustomText>
      </SectionTitle>
      <DraggableFlatList
        onScrollOffsetChange={scrollHandler}
        style={styles.flatList}
        renderItem={renderTasks}
        data={combinedTasks}
        keyExtractor={(item) => String(item.taskId)}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={renderEmptyComponent}
        ItemSeparatorComponent={() => <Divider />}
        onDragEnd={handleDragEnd}
      />
      <AnimatedFab
        icon="chevron-right"
        label="Next"
        onPress={handleSubmit}
        style={styles.fab}
        showLabel={showButton}
      />
    </View>
  );
};

export default RankingsScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
  sectionTitle: {
    marginTop: 16,
    paddingHorizontal: 16,
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
