import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Layout } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";

import ScreenTitle from "../components/ScreenTitle";
import useFetchSubmissions from "../helpers/hooks/useFetchSubmissions";
import { ResultsLocalStorageItem } from "../types";
import ResultsOverviewCard from "../components/ResultsOverviewCard";

const PastResultsScreen = ({ navigation }) => {
  const [entries, setEntries] = useState<ResultsLocalStorageItem[]>(null);

  const { result, resetSubmissions } = useFetchSubmissions();

  const handleNavigateResults = (id: string) => {
    navigation.navigate("SubmitLoading", { payload: entries[id].payload });
  };

  const handleResetSubmissions = () => {
    Alert.alert("Are you sure?", "This action will delete all your entries.", [
      {
        text: "Delete",
        style: "destructive",
        onPress: resetSubmissions,
      },
      { text: "Cancel", style: "cancel" },
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
      <ScrollView>
        {entries &&
          Object.keys(entries).map((id, index) => {
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
});
