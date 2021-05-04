import React, { useState } from "react";
import { useSelector } from "react-redux";
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

import { getTasksByOccupation } from "../../helpers/utils";
import SearchList from "../../components/SearchResultsModal";
import CustomText from "../../components/CustomText";
import TaskSearchResultCard from "../../components/TaskSearchResultCard";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const filter = (item, query) =>
  item?.toLowerCase().includes(query?.toLowerCase());

const AddByOccupationScreen = ({ navigation }) => {
  const occupations = useSelector((state) => state.local.occupations);
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
          task_type: "supplementary",
          deleted: false,
        };
      });
      setTasks(data);
    }
    setResults([]);
  };

  const renderTasks = (itemData) => {
    return <TaskSearchResultCard taskObject={itemData.item} />;
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyComponent}>
      <CustomText bold>NO TASKS FOUND</CustomText>
    </View>
  );

  return (
    <>
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
                onPress={handleSubmit}
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
    </>
  );
};

export default AddByOccupationScreen;

const styles = StyleService.create({
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
