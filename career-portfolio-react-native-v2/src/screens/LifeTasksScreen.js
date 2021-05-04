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
import LifeTaskCard from "../components/LifeTaskCard";

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

  const handleNavigation = () => {
    navigation.navigate("Rankings");
  };

  const renderTasks = (itemData) => {
    return <LifeTaskCard taskObject={itemData.item} life />;
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
        <ButtonGroup style={styles.buttonGroup}>
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
        <FlatList
          style={styles.flatList}
          renderItem={renderTasks}
          data={tasks}
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
