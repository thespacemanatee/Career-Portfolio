import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import { Button, Layout } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";

import ScreenTitle from "../components/ScreenTitle";
import useFetchSubmissions from "../helpers/hooks/useFetchSubmissions";
import { ResultsLocalStorageItem } from "../types";
import ResultsOverviewCard from "../components/ResultsOverviewCard";
import { useAppDispatch } from "../app/hooks";
import { setAllTasks } from "../app/features/tasks/tasksSlice";
import { LottieView } from "..";
import AnimatedFab from "../components/AnimatedFab";
import useHandleScroll from "../helpers/hooks/useHandleScroll";

const PastResultsScreen = ({ navigation }) => {
  const [entries, setEntries] = useState<ResultsLocalStorageItem[]>(null);

  const { height } = Dimensions.get("window");

  const { result, resetSubmissions } = useFetchSubmissions();

  const { handleScroll, showButton } = useHandleScroll();

  const dispatch = useAppDispatch();

  const handleCreateSubmission = () => {
    navigation.navigate("CreateSubmissionStack");
  };

  const handleNavigateResults = (id: string) => {
    dispatch(setAllTasks(entries[id].payload.task_list));
    navigation.navigate("ResultsStack", {
      screen: "SubmitLoading",
      params: { payload: entries[id].payload, id },
    });
  };

  const handleResetSubmissions = () => {
    Alert.alert("Are you sure?", "This action will delete all your entries.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await resetSubmissions();
        },
      },
    ]);
  };

  useEffect(() => {
    setEntries(result);
  }, [result]);

  return (
    <Layout style={styles.screen}>
      <View style={styles.header}>
        <ScreenTitle title="Hello there 👋" />
        {entries && (
          <Button
            onPress={handleResetSubmissions}
            appearance="ghost"
            status="basic"
          >
            CLEAR ALL
          </Button>
        )}
      </View>
      {!entries && (
        <View style={styles.emptyComponent}>
          <LottieView
            // eslint-disable-next-line global-require
            source={require("../../assets/empty_history.json")}
            autoPlay
            loop
            style={{ height: height / 3 }}
          />
        </View>
      )}
      {entries && (
        <ScrollView onScroll={handleScroll}>
          {Object.keys(entries).map((id, index) => {
            return (
              <View key={id} style={styles.cardContainer}>
                <ResultsOverviewCard
                  index={index}
                  id={id}
                  date={entries[id].date}
                  onetTitle={entries[id].payload.onet_title}
                  onPress={handleNavigateResults}
                />
              </View>
            );
          })}
        </ScrollView>
      )}
      <AnimatedFab
        icon="plus"
        label="Survey"
        onPress={handleCreateSubmission}
        style={styles.fab}
        showLabel={showButton}
      />
    </Layout>
  );
};

export default PastResultsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContainer: {
    marginBottom: 16,
  },
  emptyComponent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
