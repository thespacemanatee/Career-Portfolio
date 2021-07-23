import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { tasksSelector } from "../../app/features/tasks/tasksSlice";
import { useAppSelector } from "../../app/hooks";
import {
  navigationRef,
  submissionProgressRef,
} from "../../navigation/NavigationHelper";
import CustomText from "../../components/CustomText";
import { resultsConfig } from "../../helpers/config/config";
import ResultCard from "../../components/result/ResultCard";
import { getResultsTasks } from "../../helpers/utils";
import Colors from "../../helpers/config/color";
import AnimatedFab from "../../components/AnimatedFab";
import { ResultsPieChartData, ResultsScores } from "../../types";
import ThemedBackButton from "../../components/ThemedBackButton";

const HEADER_HEIGHT_EXPANDED = 80;
const HEADER_HEIGHT_COLLAPSED = 30;
const CATEGORY_HEIGHT = 500;

const ResultsDashboardScreen = ({ navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const results = useAppSelector((state) => state.results);
  const translateY = useSharedValue(0);
  const showButton = useSharedValue(true);
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      navigationRef.current = navigation;
      submissionProgressRef.current = 0;
    }, [navigation])
  );

  useEffect(() => {
    let unsubscribe;
    AsyncStorage.getItem("settings")
      .then((res) => {
        const settings = JSON.parse(res);
        unsubscribe = setTimeout(() => {
          setVisible(!settings?.read);
        }, 1000);
      })
      .catch(() => {
        unsubscribe = setTimeout(() => {
          setVisible(true);
        }, 1000);
      });
    return () => {
      clearTimeout(unsubscribe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseHelp = () => {
    setVisible(false);
  };

  const handleEditTasks = () => {
    navigation.navigate("SubmissionStack", {
      screen: "CoreTasks",
      params: { id: results.recentlyOpenedId, editing: true },
    });
  };

  const handleOpenDetails = (
    data: ResultsPieChartData[],
    scores: ResultsScores
  ) => {
    navigation.navigate("ResultsDetails", { data, scores });
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const currentOffset = event.contentOffset.y;
    showButton.value = !(currentOffset > 0 && currentOffset > translateY.value);
    translateY.value = currentOffset;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(
        translateY.value,
        [0, HEADER_HEIGHT_EXPANDED],
        [HEADER_HEIGHT_EXPANDED, 26],
        Extrapolate.CLAMP
      ),
    };
  });

  const headerTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(
        translateY.value,
        [0, HEADER_HEIGHT_EXPANDED],
        [40, 24],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <View style={styles.screen}>
      <ThemedBackButton navigation={navigation} style={styles.backButton} />
      <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
        <CustomText style={headerTextAnimatedStyle} fontFamily="extraBold">
          Results
        </CustomText>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        snapToOffsets={[HEADER_HEIGHT_COLLAPSED]}
        snapToEnd={false}
      >
        {resultsConfig.map((category) => {
          return (
            <View key={category.type} style={styles.categoryContainer}>
              <View style={styles.categoryTitleContainer}>
                <CustomText
                  fontFamily="bold"
                  style={[styles.categoryTitle, { color: category.color }]}
                >
                  {category.type}
                </CustomText>
                <CustomText>{category.description}</CustomText>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.nestedScrollViewContent}
              >
                {results[category.type].map((occupation, index) => {
                  const { similarTasks, missingTasks, notRelevantTasks } =
                    getResultsTasks(occupation, results, tasks);

                  const data: ResultsPieChartData[] = [
                    { tasks: similarTasks, color: Colors.SIMILAR },
                    { tasks: missingTasks, color: Colors.MISSING },
                    { tasks: notRelevantTasks, color: Colors.NOT_RELEVANT },
                  ];
                  const scores: ResultsScores = {
                    similarTasksScore: occupation.similarTasks / tasks.length,
                    preferenceScore: occupation.preferenceScore,
                    riasecScore: occupation.riasecScore,
                    similarityScore: occupation.similarityScore,
                  };
                  return (
                    <ResultCard
                      key={occupation.title}
                      type={category.type}
                      gradientColors={category.gradientColors}
                      rank={index + 1}
                      occupation={occupation.title}
                      data={data}
                      scores={scores}
                      onPress={handleOpenDetails}
                    />
                  );
                })}
              </ScrollView>
            </View>
          );
        })}
      </Animated.ScrollView>
      <AnimatedFab
        icon="edit"
        label="Edit"
        onPress={handleEditTasks}
        style={styles.fab}
        showLabel={showButton}
      />
    </View>
  );
};

export default ResultsDashboardScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    margin: 16,
  },
  headerContainer: {
    ...StyleSheet.absoluteFillObject,
    left: 16,
    marginTop: 16,
  },
  scrollView: {
    marginTop: HEADER_HEIGHT_COLLAPSED,
  },
  scrollViewContent: {
    paddingTop: HEADER_HEIGHT_EXPANDED,
  },
  nestedScrollViewContent: {
    paddingLeft: 16,
  },
  categoryContainer: {
    height: CATEGORY_HEIGHT,
  },
  categoryTitleContainer: {
    margin: 16,
  },
  categoryTitle: {
    fontSize: 32,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
