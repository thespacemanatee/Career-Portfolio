import React, { useState } from "react";
import { Platform, FlatList, View } from "react-native";
import {
  Button,
  Icon,
  Input,
  Layout,
  StyleService,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import { Formik } from "formik";

import { tasksSelector } from "../../app/features/tasks/tasksSlice";
import { getTasksByAction } from "../../helpers/utils";
import SearchList from "../../components/SearchResultsModal";
import CustomText from "../../components/CustomText";
import TaskSearchResultCard from "../../components/TaskSearchResultCard";
import { TaskObject, TaskType } from "../../types";
import { useAppSelector } from "../../app/hooks";

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const filter = (item: string, query: string) =>
  item?.toLowerCase().includes(query?.toLowerCase());

const AddByActionScreen = ({ navigation }) => {
  const allTasks = useAppSelector(tasksSelector.selectAll);
  const verbs = useAppSelector((state) => state.local.verbs);
  const [tasks, setTasks] = useState([]);
  const [results, setResults] = useState([]);

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

  const handleSearch = ({ action }: { action: string }) => {
    setResults(verbs.filter((item) => filter(item, action)));
  };

  const handleSelectResult = (selection) => {
    if (selection) {
      const data = getTasksByAction(selection).map((e) => {
        return {
          task: e.Task,
          taskId: e["Task ID"],
          IWA_Title: e["IWA Title"],
          task_type: TaskType.LIFE,
          deleted: false,
        };
      });
      setTasks(data);
    }
    setResults([]);
  };

  const renderTasks = ({ item }: { item: TaskObject }) => {
    const exists = allTasks.findIndex((e) => e.taskId === item.taskId) !== -1;
    return <TaskSearchResultCard taskObject={item} exists={exists} />;
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyComponent}>
      <CustomText bold>NO TASKS FOUND</CustomText>
    </View>
  );

  return (
    <View style={styles.screen}>
      <TopNavigation
        title="Add task by action"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Layout style={styles.layout}>
        <Formik initialValues={{ action: "" }} onSubmit={handleSearch}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Input
                label="Search Actions"
                returnKeyType="next"
                size="large"
                placeholder="Enter query action here"
                value={values.action}
                onChangeText={handleChange("action")}
                onBlur={handleBlur("action")}
              />
              <Button
                style={styles.button}
                onPress={() => handleSubmit()}
                appearance="outline"
              >
                SEARCH
              </Button>
            </>
          )}
        </Formik>
        <SearchList data={results} onSelect={handleSelectResult} />
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

export default AddByActionScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 10,
  },
  button: {
    marginVertical: 10,
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
