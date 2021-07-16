import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import { Button, Layout } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";

import ScreenTitle from "../components/ScreenTitle";
import useFetchSubmissions from "../helpers/hooks/useFetchSubmissions";
import { ResultsLocalStorage, ResultsLocalStorageItem } from "../types";
import ResultsOverviewCard from "../components/ResultsOverviewCard";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setAllTasks } from "../app/features/tasks/tasksSlice";
import { LottieView } from "..";
import AnimatedFab from "../components/AnimatedFab";
import useHandleScroll from "../helpers/hooks/useHandleScroll";
import CustomText from "../components/CustomText";
import SectionTitle from "../components/SectionTitle";

const DashboardScreen = ({ navigation }) => {
  const recentlyOpened = useAppSelector(
    (state) => state.results.recentlyOpened
  );
  const [previousSubmissions, setPreviousSubmissions] =
    useState<ResultsLocalStorage>(null);
  const [recentlyOpenedItem, setRecentlyOpenedItem] =
    useState<ResultsLocalStorageItem>(null);

  const { height } = Dimensions.get("window");

  const { result, resetSubmissions } = useFetchSubmissions();

  const { handleScroll, showButton } = useHandleScroll();

  const dispatch = useAppDispatch();

  const handleCreateSubmission = () => {
    navigation.navigate("CreateSubmissionStack");
  };

  const handleNavigateResults = (id: string) => {
    if (id === recentlyOpened) {
      navigation.navigate("ResultsStack", { screen: "ResultsPager" });
    } else {
      dispatch(setAllTasks(previousSubmissions[id].payload.task_list));
      navigation.navigate("ResultsStack", {
        screen: "SubmitLoading",
        params: { payload: previousSubmissions[id].payload, id },
      });
    }
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
    let recent = { ...result };
    if (result && recentlyOpened) {
      setRecentlyOpenedItem(result[recentlyOpened]);
      delete recent[recentlyOpened];
    }
    if (!(Object.keys(recent).length > 0)) {
      recent = null;
    }
    setPreviousSubmissions(recent);
  }, [recentlyOpened, result]);

  return (
    <Layout style={styles.screen}>
      <View style={styles.header}>
        <ScreenTitle title="Hello there 👋" />
        {result && (
          <Button
            onPress={handleResetSubmissions}
            appearance="ghost"
            status="basic"
          >
            CLEAR ALL
          </Button>
        )}
      </View>
      {!result && (
        <View style={styles.emptyComponent}>
          <LottieView
            // eslint-disable-next-line global-require
            source={require("../../assets/empty_history.json")}
            autoPlay
            loop
            style={{ height: height / 3 }}
          />
          <CustomText style={styles.emptyText}>
            You have no submissions.{"\n"}Start adding one!
          </CustomText>
        </View>
      )}
      <ScrollView onScroll={handleScroll} style={styles.scrollView}>
        {recentlyOpenedItem && (
          <View style={styles.cardContainer}>
            <SectionTitle title="Recently Opened" />
            <ResultsOverviewCard
              index={0}
              id={recentlyOpened}
              date={recentlyOpenedItem.date}
              onetTitle={recentlyOpenedItem.payload.onet_title}
              onPress={handleNavigateResults}
            />
          </View>
        )}
        {previousSubmissions && (
          <View>
            <SectionTitle title="Previous Submissions" />
            {Object.keys(previousSubmissions).map((id, index) => {
              return (
                <View key={id} style={styles.cardContainer}>
                  <ResultsOverviewCard
                    index={index + 1}
                    id={id}
                    date={previousSubmissions[id].date}
                    onetTitle={previousSubmissions[id].payload.onet_title}
                    onPress={handleNavigateResults}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
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

export default DashboardScreen;

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
  scrollView: {
    flexGrow: 0,
  },
  emptyComponent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
