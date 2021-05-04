import React, { useCallback, useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { useSelector } from "react-redux";
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

import alert from "../components/CustomAlert";
import CustomText from "../components/CustomText";
import RankingCard from "../components/RankingCard";
import { lifeTasksSelector } from "../app/features/tasks/lifeTasksSlice";
import { tasksSelector } from "../app/features/tasks/tasksSlice";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const RankingsScreen = ({ navigation }) => {
  const tasks = useSelector(tasksSelector.selectAll);
  const lifeTasks = useSelector(lifeTasksSelector.selectAll);
  const [combinedTasks, setCombinedTasks] = useState([]);

  useEffect(() => {
    const data = [...tasks, ...lifeTasks];
    setCombinedTasks(data);
  }, [lifeTasks, tasks]);

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

  const HelpAction = () => (
    <TopNavigationAction
      icon={HelpIcon}
      onPress={() => {
        alert(
          "Help",
          "Drag and reorder each task to the top (most preferred) or bottom (least preferred)."
        );
      }}
    />
  );

  const renderTasks = useCallback(
    // eslint-disable-next-line no-unused-expressions
    ({ item, index, drag, isActive }) => {
      return <RankingCard taskObject={item} onLongPress={drag} />;
    },
    []
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyComponent}>
      <CustomText bold>NO TASKS FOUND</CustomText>
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
        <CustomText style={styles.title} bold>
          Rank your tasks in order of preference.
        </CustomText>
        <DraggableFlatList
          style={styles.flatList}
          renderItem={renderTasks}
          data={combinedTasks}
          keyExtractor={(item) => String(item.taskId)}
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={renderEmptyComponent}
          onDragEnd={({ data }) => setCombinedTasks(data)}
        />
        <Button>SUBMIT</Button>
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
});
