import React, { useState } from "react";
import { View, FlatList, Platform } from "react-native";
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
import { getTasksByOccupation } from "../../helpers/utils";
import SearchList from "../../components/SearchResultsModal";
import TaskSearchResultCard from "../../components/TaskSearchResultCard";
import { TaskType } from "../../types";
import { useAppSelector } from "../../app/hooks";
import ListEmptyComponent from "../../components/ListEmptyComponent";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const filter = (item, query) =>
  item?.toLowerCase().includes(query?.toLowerCase());

const AddByOccupationScreen = ({ navigation }) => {
  const allTasks = useAppSelector(tasksSelector.selectAll);
  const occupations = useAppSelector((state) => state.local.occupations);
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

  const handleSearch = (query) => {
    setResults(occupations.filter((item) => filter(item, query.occupation)));
  };

  const handleSelectResult = (selection) => {
    if (selection) {
      const data = getTasksByOccupation(selection).map((e) => {
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
      <TopNavigation
        title="Add task by occupation"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Layout style={styles.layout}>
        <Formik initialValues={{ occupation: "" }} onSubmit={handleSearch}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
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

export default AddByOccupationScreen;

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
});
