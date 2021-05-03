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
import { useDispatch, useSelector } from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";

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
          `These are the tasks typically done by a ${chosenOccupation}. Check the box to indicate a Core task. Swipe right to delete tasks.`
        );
      }}
    />
  );

  const renderTasks = (itemData) => {
    return <TaskCard taskObject={itemData.item} />;
  };

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
        <FlatList
          renderItem={renderTasks}
          data={tasks}
          keyExtractor={(item) => String(item.taskId)}
        />
        <Button
          onPress={() => {
            console.log(tasks);
          }}
        >
          NEXT
        </Button>
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
