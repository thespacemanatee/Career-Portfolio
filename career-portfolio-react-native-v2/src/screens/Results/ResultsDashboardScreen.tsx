import React, { useCallback } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
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
const WIDTH = Dimensions.get("window").width;

const ResultsDashboardScreen = ({ navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const results = useAppSelector((state) => state.results);
  const progress = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const showButton = useSharedValue(true);

  useFocusEffect(
    useCallback(() => {
      navigationRef.current = navigation;
      submissionProgressRef.current = 0;
      progress.value = withTiming(1, { duration: 750 });
    }, [navigation, progress])
  );

  const handleEditTasks = () => {
    navigation.navigate("SubmissionStack", {
      screen: "CoreTasks",
      params: { id: results.recentlyOpenedId, editing: true },
    });
  };

  const handleOpenDetails = (
    data: ResultsPieChartData[],
    occupation: string,
    scores: ResultsScores
  ) => {
    navigation.navigate("ResultsDetails", { data, occupation, scores });
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const currentOffset = event.contentOffset.y;
    showButton.value = !(currentOffset > 0 && currentOffset > offsetY.value);
    offsetY.value = currentOffset;
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

  const scrollViewAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [-WIDTH, 0]);
    const opacity = interpolate(progress.value, [0, 1], [0, 1]);
    return {
      transform: [{ translateX }],
      opacity,
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
        style={[styles.scrollView, scrollViewAnimatedStyle]}
        contentContainerStyle={styles.scrollViewContent}
        snapToOffsets={[HEADER_HEIGHT_EXPANDED]}
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
    position: "absolute",
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
    fontSize: 28,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
