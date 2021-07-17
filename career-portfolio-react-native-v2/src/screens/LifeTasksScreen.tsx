import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleService,
  Button,
  ButtonGroup,
  useTheme,
} from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";

import {
  tasksSelector,
  resetLifeTasks,
} from "../app/features/tasks/tasksSlice";
import CustomText from "../components/CustomText";
import LifeTaskCard from "../components/LifeTaskCard";
import ListEmptyComponent from "../components/ListEmptyComponent";
import SectionTitle from "../components/SectionTitle";
import { submissionProgressRef } from "../navigation/NavigationHelper";
import { TaskType } from "../types";

const LifeTasksScreen = ({ route, navigation }) => {
  const tasks = useSelector(tasksSelector.selectAll);
  const [lifeTasks, setLifeTasks] = useState([]);

  const { id } = route.params || {};

  const dispatch = useDispatch();

  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      submissionProgressRef.current = 2;
    }, [])
  );

  useEffect(() => {
    setLifeTasks(tasks.filter((e) => e.task_type === TaskType.LIFE));
  }, [tasks]);

  const handleNavigation = () => {
    navigation.navigate("Rankings", { id });
  };

  const handleResetLifeTasks = () => {
    Alert.alert("Are you sure?", "This will reset your life tasks!", [
      {
        text: "Confirm",
        style: "destructive",
        onPress: () => {
          dispatch(resetLifeTasks(lifeTasks.map((e) => e.taskId)));
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const renderTasks = (itemData) => {
    return <LifeTaskCard taskObject={itemData.item} />;
  };

  const renderEmptyComponent = () => <ListEmptyComponent label="NO TASKS" />;

  return (
    <View style={styles.screen}>
      <SectionTitle title="What other tasks have you done in past jobs, or outside work?">
        <CustomText style={styles.subtitle} fontFamily="semiBold">
          A task is made up of an{" "}
          <CustomText style={{ color: theme["color-primary-500"] }}>
            action
          </CustomText>
          , object and purpose.
        </CustomText>
        <CustomText style={styles.subtitle} fontFamily="semiBold">
          Example: Interview (action) people (object) to understand perspective
          on current social trends (purpose).
        </CustomText>
      </SectionTitle>
      <CustomText style={styles.buttonGroupTitle} fontFamily="bold">
        Search task by:
      </CustomText>
      <View style={styles.controlContainer}>
        <ButtonGroup appearance="outline">
          <Button
            onPress={() => {
              navigation.navigate("AddByAction");
            }}
          >
            Action
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("AddByOccupation");
            }}
          >
            Occupation
          </Button>
        </ButtonGroup>
        {lifeTasks.length > 0 ? (
          <Button
            onPress={handleResetLifeTasks}
            appearance="ghost"
            status="basic"
          >
            CLEAR ALL
          </Button>
        ) : null}
      </View>
      <FlatList
        style={styles.flatList}
        renderItem={renderTasks}
        data={lifeTasks}
        keyExtractor={(item) => String(item.taskId)}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={renderEmptyComponent}
      />
      <Button onPress={handleNavigation}>NEXT</Button>
    </View>
  );
};

export default LifeTasksScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    fontSize: 14,
  },
  buttonGroupTitle: {
    marginVertical: 5,
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatList: {
    marginVertical: 5,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
