import React from "react";
import { View, Platform, FlatList } from "react-native";
import { useSelector } from "react-redux";
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

import { lifeTasksSelector } from "../app/features/tasks/lifeTasksSlice";
import alert from "../components/CustomAlert";
import CustomText from "../components/CustomText";
import TaskCard from "../components/TaskCard";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const LifeTasksScreen = ({ navigation }) => {
  const tasks = useSelector(lifeTasksSelector.selectAll);

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

  const renderTasks = (itemData) => {
    return <TaskCard taskObject={itemData.item} life />;
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyComponent}>
      <CustomText bold>NO TASKS</CustomText>
    </View>
  );

  return (
    <View style={styles.screen}>
      <TopNavigation
        title="Choose your Life Tasks"
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
        <ButtonGroup style={styles.buttonGroup}>
          <Button
            onPress={() => {
              navigation.navigate("AddByAction");
            }}
          >
            Add by Action
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("AddByOccupation");
            }}
          >
            Add by Occupation
          </Button>
        </ButtonGroup>
        <FlatList
          renderItem={renderTasks}
          data={tasks}
          keyExtractor={(item) => String(item.taskId)}
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={renderEmptyComponent}
        />
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
  contentContainer: {
    flexGrow: 1,
  },
  emptyComponent: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
});
