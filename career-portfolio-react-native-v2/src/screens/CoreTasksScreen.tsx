import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { StyleService, Button, useTheme } from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";

import { tasksSelector } from "../app/features/tasks/tasksSlice";
import CustomText from "../components/CustomText";
import TaskCard from "../components/TaskCard";
import { useAppSelector } from "../app/hooks";
import ListEmptyComponent from "../components/ListEmptyComponent";
import SectionTitle from "../components/SectionTitle";
import { submissionProgressRef } from "../navigation/NavigationHelper";

const CoreTasksScreen = ({ navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const [coreTasks, setCoreTasks] = useState([]);

  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      submissionProgressRef.current = 1;
    }, [])
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
      <SectionTitle title="What does your work schedule look like?">
        <CustomText style={styles.subtitle} fontFamily="semiBold">
          Select the tasks that are{" "}
          <CustomText style={{ color: theme["color-primary-500"] }}>
            core
          </CustomText>{" "}
          to your work experience. Swipe right to delete tasks you&apos;ve never
          done before.
        </CustomText>
      </SectionTitle>
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
  subtitle: {
    fontSize: 14,
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
