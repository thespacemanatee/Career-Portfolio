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
import useHandleScroll from "../../helpers/hooks/useHandleScroll";
import { navigationRef } from "../../navigation/NavigationHelper";
import CustomText from "../../components/CustomText";
import { resultsConfig } from "../../helpers/config/config";
import ResultCard from "../../components/result/ResultCard";
import { getResultsTasks } from "../../helpers/utils";
import Colors from "../../helpers/config/color";

const HEADER_HEIGHT_EXPANDED = 60;
const HEADER_HEIGHT_COLLAPSED = 60;

const ResultsDashboardScreen = ({ navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const results = useAppSelector((state) => state.results);
  const [visible, setVisible] = useState(false);
  const translateY = useSharedValue(0);

  const { handleScroll, showButton } = useHandleScroll();

  useFocusEffect(
    useCallback(() => {
      navigationRef.current = navigation;
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

  const handleOpenDetails = (id: string, data) => {
    navigation.navigate("ResultsDetails", { id, data });
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(
        translateY.value,
        [0, HEADER_HEIGHT_EXPANDED],
        [HEADER_HEIGHT_EXPANDED, 0],
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
      >
        {resultsConfig.map((category, categoryIndex) => {
          return (
            <View key={category.type}>
              <View style={styles.categoryTitleContainer}>
                <CustomText
                  fontFamily="bold"
                  style={[styles.categoryTitle, { color: category.color }]}
                >
                  {category.type}
                </CustomText>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.nestedScrollViewContent}
              >
                {results[category.type].map((occupation, cardIndex) => {
                  const { similarTasks, missingTasks, notRelevantTasks } =
                    getResultsTasks(occupation, results, tasks);

                  const data = [
                    { tasks: similarTasks, color: Colors.SIMILAR },
                    { tasks: missingTasks, color: Colors.MISSING },
                    { tasks: notRelevantTasks, color: Colors.NOT_RELEVANT },
                  ];
                  return (
                    <ResultCard
                      id={`card-${categoryIndex}-${cardIndex}`}
                      key={occupation.title}
                      data={data}
                      onPress={handleOpenDetails}
                    />
                  );
                })}
              </ScrollView>
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default ResultsDashboardScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    ...StyleSheet.absoluteFillObject,
    left: 14,
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
  categoryTitleContainer: {
    margin: 16,
  },
  categoryTitle: {
    fontSize: 32,
  },
});
