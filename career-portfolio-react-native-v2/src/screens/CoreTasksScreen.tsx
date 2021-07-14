import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import {
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
import ListEmptyComponent from "../components/ListEmptyComponent";

const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const CoreTasksScreen = ({ navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const chosenOccupation = useAppSelector((state) => state.form.onet_title);
  const [coreTasks, setCoreTasks] = useState([]);

  const handleHelp = () => {
    alert(
      "Help",
      `These are the tasks typically done by a ${chosenOccupation}. Check the box to indicate a Core task. Swipe right to delete tasks.`
    );
  };

  const HelpAction = () => (
    <TopNavigationAction icon={HelpIcon} onPress={handleHelp} />
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
    <ListEmptyComponent label="NO TASKS FOUND" />
  );

  return (
    <View style={styles.screen}>
      <CustomText style={styles.title} fontFamily="bold">
        What does your work schedule look like?
      </CustomText>
      <View
        needsOffscreenAlphaCompositing
        renderToHardwareTextureAndroid
        style={styles.cardContainer}
      >
        <SelectedOccupationCard occupation={chosenOccupation} />
      </View>
      <FlatList
        style={styles.flatList}
        renderItem={renderTasks}
        data={coreTasks}
        keyExtractor={(item) => String(item.taskId)}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={renderEmptyComponent}
      />
      <Button onPress={handleNavigation}>NEXT</Button>
    </View>
  );
};

export default CoreTasksScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
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
  cardContainer: {
    padding: 6,
  },
});
