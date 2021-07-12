import React, { useState, useEffect } from "react";
import { FlatList, Platform, View } from "react-native";
import {
  Card,
  Icon,
  Layout,
  StyleService,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import CustomText from "../../components/CustomText";
import { useAppSelector } from "../../app/hooks";
import {
  ResultsMissingData,
  ResultsSimilarData,
  ResultsType,
  TaskObject,
} from "../../types";
import SelectedOccupationCard from "../../components/SelectedOccupationCard";
import { tasksSelector } from "../../app/features/tasks/tasksSlice";

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const ResultsDetailsScreen = ({ route, navigation }) => {
  const storeTasks = useAppSelector(tasksSelector.selectAll);
  const results = useAppSelector((state) => state.results);
  const [tasks, setTasks] = useState([]);
  const { title, type, occupation } = route.params;
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

  useEffect(() => {
    const temp: ResultsSimilarData[] | ResultsMissingData[] = [];
    if (type === ResultsType.SIMILAR) {
      results.similar
        .filter((e) => e.title === occupation)
        .forEach((e) => {
          if (
            !temp.some((v: ResultsSimilarData) => v.similarIWA === e.similarIWA)
          ) {
            temp.push(e);
          }
        });
      setTasks(temp);
    } else if (type === ResultsType.MISSING) {
      results.missing
        .filter((e) => e.title === occupation)
        .forEach((e) => {
          if (
            !temp.some((v: ResultsMissingData) => v.missingIWA === e.missingIWA)
          ) {
            temp.push(e);
          }
        });
      setTasks(temp);
    } else if (type === ResultsType.IRRELEVANT) {
      const temp1: TaskObject[] = [];
      storeTasks
        .filter((e) => {
          return results.similar.filter((d) => e.IWA_Title !== d.similarIWA);
        })
        .forEach((e) => {
          if (!temp1.some((v: TaskObject) => v.IWA_Title === e.IWA_Title)) {
            temp1.push(e);
          }
        });
      setTasks(temp1);
    }
  }, [occupation, results.missing, results.similar, storeTasks, type]);

  const renderTasks = ({ item, index }) => {
    let task: string;
    if (type === ResultsType.SIMILAR) {
      task = item.similarIWA;
    } else if (type === ResultsType.MISSING) {
      task = item.missingIWA;
    } else if (type === ResultsType.IRRELEVANT) {
      task = item.IWA_Title;
    }
    return (
      <Card disabled>
        <CustomText>{task}</CustomText>
      </Card>
    );
  };

  return (
    <View style={styles.screen}>
      <TopNavigation
        title={title}
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Layout style={styles.layout}>
        <SelectedOccupationCard occupation={occupation} />
        <CustomText style={styles.tasksText} fontFamily="bold">
          {type === ResultsType.IRRELEVANT
            ? "Tasks Specific to Current Job"
            : `${type} Tasks:`}
        </CustomText>
        <FlatList
          data={tasks}
          renderItem={renderTasks}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={{}}
        />
      </Layout>
    </View>
  );
};

export default ResultsDetailsScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 10,
  },
  selectedOccupation: {
    padding: 20,
    marginVertical: 5,
  },
  tasksText: {
    fontSize: 26,
    marginVertical: 12,
  },
});
