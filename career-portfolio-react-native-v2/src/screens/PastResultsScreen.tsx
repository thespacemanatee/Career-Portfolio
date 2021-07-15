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

const PastResultsScreen = ({ navigation }) => {
  const [entries, setEntries] = useState<ResultsLocalStorageItem[]>(null);

  const { height } = Dimensions.get("window");

  const { result, resetSubmissions } = useFetchSubmissions();

  const dispatch = useAppDispatch();

  const handleNavigateResults = (id: string) => {
    dispatch(setAllTasks(entries[id].payload.task_list));
    navigation.navigate("SubmitLoading", { payload: entries[id].payload });
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
        <ScreenTitle title="History" />
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
        <ScrollView>
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
    </Layout>
  );
};

export default PastResultsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
});
