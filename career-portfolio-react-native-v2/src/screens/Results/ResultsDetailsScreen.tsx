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
  RESULTS_TYPE,
} from "../../types";
import ShadowCard from "../../components/ShadowCard";

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

const ResultsDetailsScreen = ({ route, navigation }) => {
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
    if (type === RESULTS_TYPE.SIMILAR) {
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
    } else if (type === RESULTS_TYPE.MISSING) {
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
    }
  }, [occupation, results.missing, results.similar, type]);

  const renderTasks = ({ item, index }) => {
    let task: string;
    if (type === RESULTS_TYPE.SIMILAR) {
      task = item.similarIWA;
    } else if (type === RESULTS_TYPE.MISSING) {
      task = item.missingIWA;
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
        <ShadowCard style={styles.selectedOccupation} disabled>
          <CustomText bold>Occupation:</CustomText>
          <CustomText>{occupation}</CustomText>
        </ShadowCard>
        <CustomText
          style={styles.tasksText}
          bold
        >{`${type} Tasks:`}</CustomText>
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
  },
});
