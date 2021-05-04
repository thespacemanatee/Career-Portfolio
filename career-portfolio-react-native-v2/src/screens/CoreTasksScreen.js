import React from "react";
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
import { useSelector } from "react-redux";

import { tasksSelector } from "../app/features/tasks/tasksSlice";
import alert from "../components/CustomAlert";
import ShadowCard from "../components/ShadowCard";
import CustomText from "../components/CustomText";
import TaskCard from "../components/TaskCard";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const CoreTasksScreen = ({ navigation }) => {
  const tasks = useSelector(tasksSelector.selectAll);
  const chosenOccupation = useSelector((state) => state.form.onet_title);

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
        title="Choose your Core Tasks"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={HelpAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        <CustomText style={styles.title} bold>
          What does your work schedule look like?
        </CustomText>
        <ShadowCard style={styles.selectedOccupation}>
          <CustomText bold>Selected Occupation</CustomText>
          <CustomText numberOfLines={1}>{chosenOccupation}</CustomText>
        </ShadowCard>
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
    height: 75,
    padding: 10,
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
