import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Icon, Modal, Card } from "@ui-kitten/components";
import PagerView from "react-native-pager-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { useAppSelector } from "../../app/hooks";
import Item from "../../components/pager/Item";
import Pagination, { DOT_SIZE } from "../../components/pager/Pagination";
import Ticker from "../../components/pager/Ticker";
import {
  PagerViewOnPageScrollEventData,
  ResultsCountData,
  ResultsViewPagerConfig,
  TaskObject,
  ResultsSimilarData,
  ResultsMissingData,
} from "../../types";
import ResultsIntroductionModal from "./ResultsIntroductionModal";
import ResultCard from "../../components/ResultCard";
import { tasksSelector } from "../../app/features/tasks/tasksSlice";
import { navigationRef } from "../../navigation/NavigationHelper";
import { ICON_SIZE, pagerConfig } from "../../helpers/config/config";
import AnimatedFab from "../../components/AnimatedFab";
import useHandleScroll from "../../helpers/hooks/useHandleScroll";
import ThemedBackButton from "../../components/ThemedBackButton";

const HelpIcon = (props: any) => (
  <Icon
    {...props}
    name="question-mark-circle"
    style={styles.helpIcon}
    fill="black"
  />
);

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ResultsPagerScreen = ({ navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const results = useAppSelector((state) => state.results);
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);
  const [pagePosition, setPagePosition] = useState(0);

  const { handleScroll, showButton } = useHandleScroll();

  const { width, height } = useWindowDimensions();

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

  const handleEditTasks = () => {
    navigation.navigate("SubmissionStack", {
      screen: "CoreTasks",
      params: { id: results.recentlyOpenedId, editing: true },
    });
  };

  const handleSelectCategory = (type: string, occupation: string) => {
    navigation.navigate("ResultsDetails", {
      title: Object.values(pagerConfig)[pagePosition].type,
      type,
      occupation,
    });
  };

  const renderResults = ({
    item,
    index,
  }: {
    item: ResultsCountData;
    index: number;
  }) => {
    const similar: ResultsSimilarData[] = results.similar.filter(
      (e) => e.title === item.title
    );
    const missing: ResultsMissingData[] = results.missing.filter(
      (e) => e.title === item.title
    );
    const notRelevant: TaskObject[] = tasks.filter((e) => {
      return results.similar.filter((d) => e.IWA_Title !== d.similarIWA);
    });

    return (
      <ResultCard
        index={index + 1}
        item={item}
        similar={similar.length}
        missing={missing.length}
        notRelevant={notRelevant.length}
        onSelectCategory={handleSelectCategory}
      />
    );
  };

  const renderPage = (item: ResultsViewPagerConfig, index: number) => {
    return (
      <View collapsable={false} key={String(index)}>
        <Item scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}>
          <FlatList
            onScroll={handleScroll}
            renderItem={renderResults}
            data={results[item.type]}
            contentContainerStyle={styles.contentContainer}
            keyExtractor={(e, i) => String(i)}
          />
        </Item>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <ThemedBackButton navigation={navigation} style={styles.backButton} />
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={handleCloseHelp}
      >
        <Card
          disabled
          style={{
            height: (height / 4) * 2.5,
            width: (width / 4) * 3.5,
          }}
        >
          <ResultsIntroductionModal onClose={handleCloseHelp} />
        </Card>
      </Modal>
      <View style={styles.headerContainer}>
        <Ticker
          scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
          positionAnimatedValue={positionAnimatedValue}
          config={pagerConfig}
        />
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
        >
          <HelpIcon />
        </TouchableOpacity>
      </View>
      <AnimatedPagerView
        initialPage={0}
        style={styles.pagerView}
        onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
          [
            {
              nativeEvent: {
                offset: scrollOffsetAnimatedValue,
                position: positionAnimatedValue,
              },
            },
          ],
          {
            listener: ({ nativeEvent: { offset, position } }) => {
              // console.log(`Position: ${position} Offset: ${offset}`);
              setPagePosition(position);
            },
            useNativeDriver: true,
          }
        )}
      >
        {pagerConfig.map((item, index) => renderPage(item, index))}
      </AnimatedPagerView>
      <View style={styles.pageIndicator}>
        <Pagination
          scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
          positionAnimatedValue={positionAnimatedValue}
          config={pagerConfig}
        />
      </View>
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

export default ResultsPagerScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  backButton: {
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pagerView: {
    flex: 1,
  },
  pageIndicator: {
    alignItems: "flex-end",
    marginVertical: 5,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 6,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  helpIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: DOT_SIZE,
  },
});
