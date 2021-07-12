import React, { useCallback, useEffect, useState } from "react";
import { Platform, View } from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
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

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props: any) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const RankingsScreen = ({ navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const form = useAppSelector((state) => state.form);
  const [combinedTasks, setCombinedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);

  const dispatch = useAppDispatch();

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        if (Platform.OS === "web") {
          window.history.back();
        } else {
          navigation.goBack();
        }
      }}
    />
  );

  const handleHelp = () => {
    alert(
      "Help",
      "Drag and reorder each task to the top (most preferred) or bottom (least preferred)."
    );
  };

  useEffect(() => {
    handleHelp();
  }, []);

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
    <View style={styles.emptyComponent}>
      <CustomText fontFamily="bold">NO TASKS FOUND</CustomText>
    </View>
  );

  return (
    <View style={styles.screen}>
      <TopNavigation
        title="Rank Your Tasks"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={HelpAction}
      />
      <Divider />
      <Layout style={styles.layout}>
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
      </Layout>
    </View>
  );
};

export default RankingsScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 10,
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
  emptyComponent: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
