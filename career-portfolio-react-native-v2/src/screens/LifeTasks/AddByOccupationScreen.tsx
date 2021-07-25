import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Button, Divider, Input, StyleService } from "@ui-kitten/components";
import { Formik } from "formik";

import { tasksSelector } from "../../app/features/tasks/tasksSlice";
import {
  fetchOnetData,
  getTasksByOccupation,
  handleErrorResponse,
} from "../../helpers/utils";
import SearchList from "../../components/SearchResultsModal";
import TaskSearchResultCard from "../../components/TaskSearchResultCard";
import { TaskObject, TaskType } from "../../types";
import { useAppSelector } from "../../app/hooks";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import ThemedBackButton from "../../components/ThemedBackButton";
import SectionTitle from "../../components/SectionTitle";

const AddByOccupationScreen = ({ navigation }) => {
  const allTasks = useAppSelector(tasksSelector.selectAll);
  const [tasks, setTasks] = useState([]);
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const res = await fetchOnetData(query);
      setResults(res);
    } catch (err) {
      handleErrorResponse(err);
    }
  };

  const handleSelectResult = (selection: string) => {
    if (selection) {
      const data: TaskObject[] = getTasksByOccupation(selection)
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

  const renderTasks = (itemData) => {
    const exists =
      allTasks.findIndex((e) => e.taskId === itemData.item.taskId) !== -1;
    return <TaskSearchResultCard taskObject={itemData.item} exists={exists} />;
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
      <SectionTitle
        title="Add Task By Occupation"
        style={styles.sectionTitle}
      />
      <Formik initialValues={{ occupation: "" }} onSubmit={handleSearch}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formikContainer}>
            <Input
              label="Search Occupations"
              returnKeyType="next"
              size="large"
              placeholder="Enter query occupation here"
              value={values.occupation}
              onChangeText={handleChange("occupation")}
              onBlur={handleBlur("occupation")}
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

export default AddByOccupationScreen;

const styles = StyleService.create({
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
