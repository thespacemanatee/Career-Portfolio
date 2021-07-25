import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Divider, Input } from "@ui-kitten/components";
import { Formik } from "formik";

import { tasksSelector } from "../../app/features/tasks/tasksSlice";
import { getTasksByAction } from "../../helpers/utils";
import SearchList from "../../components/SearchResultsModal";
import TaskSearchResultCard from "../../components/TaskSearchResultCard";
import { TaskObject, TaskType } from "../../types";
import { useAppSelector } from "../../app/hooks";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import ThemedBackButton from "../../components/ThemedBackButton";
import SectionTitle from "../../components/SectionTitle";

const filter = (item: string, query: string) =>
  item?.toLowerCase().includes(query?.toLowerCase());

const AddByActionScreen = ({ navigation }) => {
  const allTasks = useAppSelector(tasksSelector.selectAll);
  const verbs = useAppSelector((state) => state.local.verbs);
  const [tasks, setTasks] = useState([]);
  const [results, setResults] = useState([]);

  const handleSearch = ({ action }: { action: string }) => {
    setResults(verbs.filter((item) => filter(item, action)));
  };

  const handleSelectResult = (selection) => {
    if (selection) {
      const data: TaskObject[] = getTasksByAction(selection)
        .filter(
          (e) =>
            !allTasks.some(
              (d) => e["Task ID"] === d.taskId && d.task_type !== TaskType.LIFE
            )
        )
        .map((e) => {
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
    <ListEmptyComponent label="NO TASKS FOUND" />
  );

  return (
    <View style={styles.screen}>
      <ThemedBackButton
        navigation={navigation}
        label="Done"
        style={styles.doneButton}
      />
      <SectionTitle title="Add Task By Action" style={styles.sectionTitle} />
      <Formik initialValues={{ action: "" }} onSubmit={handleSearch}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formikContainer}>
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
          </View>
        )}
      </Formik>
      <SearchList data={results} onSelect={handleSelectResult} />
      <FlatList
        renderItem={renderTasks}
        data={tasks}
        keyExtractor={(item) => String(item.taskId)}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={renderEmptyComponent}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

export default AddByActionScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  doneButton: {
    alignSelf: "flex-end",
    margin: 16,
  },
  sectionTitle: {
    paddingHorizontal: 16,
  },
  button: {
    marginVertical: 10,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  formikContainer: {
    paddingHorizontal: 16,
  },
});
