import React, { useCallback, useEffect, useState } from "react";
import { View, Platform, FlatList } from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  StyleService,
  Button,
  Icon,
  TopNavigationAction,
  Card,
} from "@ui-kitten/components";
import { useSelector } from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";

import alert from "../components/CustomAlert";
import ShadowCard from "../components/ShadowCard";
import CustomText from "../components/CustomText";
import { getTasks } from "../helpers/utils";
import TaskCard from "../components/TaskCard";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const CoreTasksScreen = ({ navigation }) => {
  const chosenOccupation = useSelector((state) => state.form.onet_title);
  const [tasks, setTasks] = useState([]);

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

  const renderTasks = (itemData) => {
    const { Task, "Task ID": TaskID, "IWA Title": IWATitle } = itemData.item;
    const taskObject = {
      task: Task,
      taskId: TaskID,
      IWA_Title: IWATitle,
    };
    return <TaskCard taskObject={taskObject} />;
  };

  useEffectOnce(() => {
    setTasks(getTasks(chosenOccupation));
  });

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
        <ShadowCard style={styles.selectedOccupation}>
          <CustomText bold>Selected Occupation</CustomText>
          <CustomText numberOfLines={1}>{chosenOccupation}</CustomText>
        </ShadowCard>
        <FlatList renderItem={renderTasks} data={tasks} />
        <Button>NEXT</Button>
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
  selectedOccupation: {
    height: 75,
    padding: 10,
  },
});
