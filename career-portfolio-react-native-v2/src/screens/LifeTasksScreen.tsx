import React, { useEffect, useState } from "react";
import { View, Platform, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Layout,
  TopNavigation,
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

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);
const RefreshIcon = (props) => <Icon {...props} name="refresh-outline" />;

const LifeTasksScreen = ({ navigation }) => {
  const tasks = useSelector(tasksSelector.selectAll);
  const [lifeTasks, setLifeTasks] = useState([]);

  const dispatch = useDispatch();

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
          "A task is made up of an action, object and purpose.\nExample: Interview (action) people (object) to understand perspective on current social trends (purpose)."
        );
      }}
    />
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

  const renderEmptyComponent = () => (
    <View style={styles.emptyComponent}>
      <CustomText bold>NO TASKS</CustomText>
    </View>
  );

  return (
    <View style={styles.screen}>
      <TopNavigation
        title="Choose Your Life Tasks"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={HelpAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        <CustomText style={styles.title} bold>
          What other tasks have you done in past jobs, or outside work?
        </CustomText>
        <CustomText style={styles.buttonGroupTitle} bold>
          Search task by:
        </CustomText>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ButtonGroup>
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
          <Button
            onPress={handleResetLifeTasks}
            accessoryRight={RefreshIcon}
            appearance="ghost"
            status="basic"
          />
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
      </Layout>
    </View>
  );
};

export default LifeTasksScreen;

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
  buttonGroupTitle: {
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
