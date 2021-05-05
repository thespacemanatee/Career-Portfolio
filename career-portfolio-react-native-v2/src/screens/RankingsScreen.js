/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Divider,
  Layout,
  TopNavigation,
  StyleService,
  Button,
  TopNavigationAction,
  Icon,
} from "@ui-kitten/components";
import DraggableFlatList from "react-native-draggable-flatlist";
import axios from "axios";

import { setAllTasks, tasksSelector } from "../app/features/tasks/tasksSlice";
import alert from "../components/CustomAlert";
import CustomText from "../components/CustomText";
import RankingCard from "../components/RankingCard";
import { handleErrorResponse } from "../helpers/utils";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const RankingsScreen = ({ navigation }) => {
  const tasks = useSelector(tasksSelector.selectAll);
  const form = useSelector((state) => state.form);
  const [combinedTasks, setCombinedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);

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
          "Drag and reorder each task to the top (most preferred) or bottom (least preferred)."
        );
      }}
    />
  );

  const postResult = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url:
          "https://rjiu5d34rj.execute-api.ap-southeast-1.amazonaws.com/test/post-json",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });

      const { onet_title, user_id, count, similar, missing } = response.data;

      console.log(Object.keys(response.data));

      const responseData = {
        count: JSON.parse(count),
        similar_columns: JSON.parse(similar),
        missing_columns: JSON.parse(missing),
      };

      console.log(responseData);
    } catch (err) {
      handleErrorResponse(err);
    }
  };

  const handleSubmit = () => {
    const tasksArray = tasks.map((e) => {
      return {
        task: e.task,
        taskId: e.taskId,
        IWA_Title: e.IWA_Title,
        task_type: e.task_type,
      };
    });
    // console.log(tasksArray);
    const payload = {
      ...form,
      task_list: tasksArray,
    };
    // console.log(payload);
    postResult(payload);
  };

  useEffect(() => {
    setDeletedTasks(tasks.filter((e) => e.deleted === true));
    setCombinedTasks(tasks.filter((e) => e.deleted !== true));
  }, [tasks]);

  const handleDragEnd = ({ data }) => {
    dispatch(setAllTasks(data.concat(deletedTasks)));
  };

  const renderTasks = useCallback(
    // eslint-disable-next-line no-unused-expressions
    ({ item, index, drag, isActive }) => {
      return <RankingCard taskObject={item} onLongPress={drag} />;
    },
    []
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyComponent}>
      <CustomText bold>NO TASKS FOUND</CustomText>
    </View>
  );

  return (
    <View style={styles.screen}>
      <TopNavigation
        title="Rank Your Tasks"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={HelpAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        <CustomText style={styles.title} bold>
          Rank your tasks in order of preference.
        </CustomText>
        <DraggableFlatList
          style={styles.flatList}
          renderItem={renderTasks}
          data={combinedTasks}
          keyExtractor={(item) => String(item.taskId)}
          contentContainerStyle={styles.contentContainer}
          ListEmptyComponent={renderEmptyComponent}
          onDragEnd={handleDragEnd}
        />
        <Button onPress={handleSubmit}>SUBMIT</Button>
      </Layout>
    </View>
  );
};

export default RankingsScreen;

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
