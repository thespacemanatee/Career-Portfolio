import React, { useEffect, useState } from "react";
import { View, Platform, FlatList } from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  StyleService,
  Button,
  Icon,
  TopNavigationAction,
} from "@ui-kitten/components";

import { tasksSelector } from "../app/features/tasks/tasksSlice";
import alert from "../components/CustomAlert";
import CustomText from "../components/CustomText";
import TaskCard from "../components/TaskCard";
import { useAppSelector } from "../app/hooks";
import SelectedOccupationCard from "../components/SelectedOccupationCard";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const CoreTasksScreen = ({ navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const chosenOccupation = useAppSelector((state) => state.form.onet_title);
  const [coreTasks, setCoreTasks] = useState([]);

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
          `These are the tasks typically done by a ${chosenOccupation}. Check the box to indicate a Core task. Swipe right to delete tasks.`
        );
      }}
    />
  );

  useEffect(() => {
    setCoreTasks(tasks.filter((e) => e.task_type !== "life"));
  }, [tasks]);

  const handleNavigation = () => {
    navigation.navigate("LifeTasksStack");
  };

  const renderTasks = (itemData) => {
    return <TaskCard taskObject={itemData.item} />;
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyComponent}>
      <CustomText bold>NO TASKS FOUND</CustomText>
    </View>
  );

  return (
    <View style={styles.screen}>
      <TopNavigation
        title="Choose Your Core Tasks"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={HelpAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        <CustomText style={styles.title} bold>
          What does your work schedule look like?
        </CustomText>
        <SelectedOccupationCard occupation={chosenOccupation} />
        <FlatList
          style={styles.flatList}
          renderItem={renderTasks}
          data={coreTasks}
          keyExtractor={(item) => String(item.taskId)}
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={renderEmptyComponent}
        />
        <Button onPress={handleNavigation}>NEXT</Button>
      </Layout>
    </View>
  );
};

export default CoreTasksScreen;

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
  selectedOccupation: {
    padding: 20,
    marginVertical: 5,
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
