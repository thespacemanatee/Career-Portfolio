import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleService,
  Button,
  Icon,
  TopNavigationAction,
  ButtonGroup,
} from "@ui-kitten/components";

import {
  tasksSelector,
  resetLifeTasks,
} from "../app/features/tasks/tasksSlice";
import alert from "../components/CustomAlert";
import CustomText from "../components/CustomText";
import LifeTaskCard from "../components/LifeTaskCard";
import ListEmptyComponent from "../components/ListEmptyComponent";

const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const LifeTasksScreen = ({ navigation }) => {
  const tasks = useSelector(tasksSelector.selectAll);
  const [lifeTasks, setLifeTasks] = useState([]);

  const dispatch = useDispatch();

  const handleHelp = () => {
    alert(
      "Help",
      "A task is made up of an action, object and purpose.\nExample: Interview (action) people (object) to understand perspective on current social trends (purpose)."
    );
  };

  const HelpAction = () => (
    <TopNavigationAction icon={HelpIcon} onPress={handleHelp} />
  );

  useEffect(() => {
    setLifeTasks(tasks.filter((e) => e.task_type === "life"));
  }, [tasks]);

  const handleNavigation = () => {
    navigation.navigate("Rankings");
  };

  const handleResetLifeTasks = () => {
    alert("Are you sure?", "This will reset your life tasks!", [
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
      <CustomText style={styles.title} fontFamily="bold">
        What other tasks have you done in past jobs, or outside work?
      </CustomText>
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
  },
  title: {
    fontSize: 26,
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
