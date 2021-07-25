import React, { useCallback, useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import { Button } from "@ui-kitten/components";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";

import useFetchSubmissions from "../helpers/hooks/useFetchSubmissions";
import { ResultsLocalStorage, ResultsLocalStorageItem } from "../types";
import ResultsOverviewCard from "../components/ResultsOverviewCard";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setAllTasks } from "../app/features/tasks/tasksSlice";
import { LottieView } from "..";
import AnimatedFab from "../components/AnimatedFab";
import CustomText from "../components/CustomText";
import SectionTitle from "../components/SectionTitle";
import { navigationRef } from "../navigation/NavigationHelper";

const HEADER_HEIGHT_EXPANDED = 80;
const HEADER_HEIGHT_COLLAPSED = 30;

const DashboardScreen = ({ navigation }) => {
  const recentlyOpenedId = useAppSelector(
    (state) => state.results.recentlyOpenedId
  );
  const [previousSubmissions, setPreviousSubmissions] =
    useState<ResultsLocalStorage>(null);
  const [recentlyOpenedItem, setRecentlyOpenedItem] =
    useState<ResultsLocalStorageItem>(null);
  const progress = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const showLabel = useSharedValue(true);

  const { width } = Dimensions.get("window");

  const { result, resetSubmissions } = useFetchSubmissions();

  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      navigationRef.current = navigation;
      progress.value = withTiming(1, { duration: 750 });
    }, [navigation, progress])
  );

  const handleCreateSubmission = () => {
    navigation.navigate("SubmissionStack");
  };

  const handleNavigateResults = (id: string) => {
    if (id === recentlyOpenedId) {
      dispatch(setAllTasks(result[recentlyOpenedId].payload.task_list));
      navigation.navigate("ResultsStack", {
        screen: "ResultsModalStack",
        params: { screen: "ResultsDashboard" },
      });
    } else {
      dispatch(setAllTasks(previousSubmissions[id].payload.task_list));
      navigation.navigate("ResultsStack", {
        screen: "SubmitLoading",
        params: { payload: previousSubmissions[id].payload, id },
      });
    }
  };

  const handleResetSubmissions = () => {
    Alert.alert(
      "Are you sure?",
      "This action will delete all your submissions.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await resetSubmissions();
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (!result) {
      setPreviousSubmissions(null);
      setRecentlyOpenedItem(null);
    } else {
      const recent = { ...result };
      if (recentlyOpenedId) {
        setRecentlyOpenedItem(result[recentlyOpenedId]);
        delete recent[recentlyOpenedId];
      } else {
        setRecentlyOpenedItem(null);
      }
      setPreviousSubmissions(Object.keys(recent).length > 0 ? recent : null);
    }
  }, [recentlyOpenedId, result]);

  const recentAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [-25, 0]);
    const opacity = interpolate(progress.value, [0, 1], [0, 1]);
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const previousAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [-25, 0]);
    const opacity = interpolate(progress.value, [0, 1], [0, 1]);
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const clearAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(
        offsetY.value,
        [0, HEADER_HEIGHT_EXPANDED],
        [HEADER_HEIGHT_EXPANDED, 26],
        Extrapolate.CLAMP
      ),
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [-25, 0]);
    const opacity = interpolate(progress.value, [0, 1], [0, 1]);
    return {
      top: interpolate(
        offsetY.value,
        [0, HEADER_HEIGHT_EXPANDED],
        [HEADER_HEIGHT_EXPANDED, 26],
        Extrapolate.CLAMP
      ),
      transform: [{ translateY }],
      opacity,
    };
  });

  const headerTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(
        offsetY.value,
        [0, HEADER_HEIGHT_EXPANDED],
        [36, 24],
        Extrapolate.CLAMP
      ),
    };
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const currentOffset = event.contentOffset.y;
    showLabel.value = !(currentOffset > 0 && currentOffset > offsetY.value);
    offsetY.value = currentOffset;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.topOffset} />
      <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
        <CustomText fontFamily="bold" style={headerTextAnimatedStyle}>
          Hello there 👋
        </CustomText>
      </Animated.View>
      {result && (
        <Animated.View style={[styles.clearAllButton, clearAnimatedStyle]}>
          <Button
            onPress={handleResetSubmissions}
            appearance="ghost"
            status="basic"
          >
            CLEAR
          </Button>
        </Animated.View>
      )}
      {!result && (
        <View style={styles.emptyComponent}>
          <LottieView
            // eslint-disable-next-line global-require
            source={require("../../assets/empty_history.json")}
            autoPlay
            loop
            style={[styles.lottieView, { width: width / 1.5 }]}
          />
          <CustomText style={styles.emptyText}>
            You have no submissions.{"\n"}Start adding one!
          </CustomText>
        </View>
      )}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        snapToOffsets={[HEADER_HEIGHT_EXPANDED]}
        snapToEnd={false}
      >
        {recentlyOpenedItem && (
          <View>
            <Animated.View style={[recentAnimatedStyle, styles.sectionTitle]}>
              <SectionTitle title="Recently Opened" />
            </Animated.View>
            <View style={styles.cardContainer}>
              <ResultsOverviewCard
                index={0}
                id={recentlyOpenedId}
                date={recentlyOpenedItem.payload.date}
                editedDate={recentlyOpenedItem.editedDate}
                onetTitle={recentlyOpenedItem.payload.onet_title}
                onPress={handleNavigateResults}
              />
            </View>
          </View>
        )}
        {previousSubmissions && (
          <View>
            <Animated.View style={[previousAnimatedStyle, styles.sectionTitle]}>
              <SectionTitle title="Previous Submissions" />
            </Animated.View>
            {Object.keys(previousSubmissions).map((id, index) => {
              return (
                <View key={id} style={styles.cardContainer}>
                  <ResultsOverviewCard
                    index={index + 1}
                    id={id}
                    date={previousSubmissions[id].payload.date}
                    editedDate={previousSubmissions[id].editedDate}
                    onetTitle={previousSubmissions[id].payload.onet_title}
                    onPress={handleNavigateResults}
                  />
                </View>
              );
            })}
          </View>
        )}
      </Animated.ScrollView>
      <AnimatedFab
        icon="plus"
        label="Survey"
        onPress={handleCreateSubmission}
        style={styles.fab}
        showLabel={showLabel}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  topOffset: {
    height: 56,
  },
  clearAllButton: {
    position: "absolute",
    right: 0,
    marginTop: 16,
    zIndex: 10,
  },
  headerContainer: {
    position: "absolute",
    left: 16,
    marginTop: 16,
  },
  sectionTitle: {
    paddingHorizontal: 16,
  },
  cardContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  scrollView: {
    flexGrow: 0,
    marginTop: HEADER_HEIGHT_COLLAPSED,
  },
  scrollViewContent: {
    paddingTop: HEADER_HEIGHT_EXPANDED,
  },
  lottieView: {
    marginBottom: 16,
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
