import React, { useState, useEffect } from "react";
import { FlatList, Platform, View } from "react-native";
import {
  Icon,
  Layout,
  StyleService,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import CustomText from "../../components/CustomText";
import { useAppSelector } from "../../app/hooks";
import { RESULTS_TYPE } from "../../types";

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
    if (type === RESULTS_TYPE.SIMILAR) {
      setTasks(results.similar.filter((e) => e.title === occupation));
    } else if (type === RESULTS_TYPE.MISSING) {
      setTasks(results.missing.filter((e) => e.title === occupation));
    }
  }, [occupation, results.missing, results.similar, type]);

  const renderTasks = ({ item, index }) => {
    let task: string;
    if (type === RESULTS_TYPE.SIMILAR) {
      task = item.similarIWA;
    } else if (type === RESULTS_TYPE.MISSING) {
      task = item.missingIWA;
    }
    return <CustomText>{task}</CustomText>;
  };

  return (
    <View style={styles.screen}>
      <TopNavigation
        title={title}
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Layout style={styles.layout}>
        <CustomText bold>Occupation:</CustomText>
        <CustomText>{occupation}</CustomText>
        <CustomText bold>{`${type} Tasks:`}</CustomText>
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
});
