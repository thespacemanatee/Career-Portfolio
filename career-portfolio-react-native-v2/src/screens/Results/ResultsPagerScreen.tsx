import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Icon, Modal, Card, Layout } from "@ui-kitten/components";
import PagerView from "react-native-pager-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAppSelector } from "../../app/hooks";
import Item from "../../components/pager/Item";
import Pagination from "../../components/pager/Pagination";
import Ticker from "../../components/pager/Ticker";
import {
  PagerViewOnPageScrollEventData,
  ResultsCountData,
  ResultsViewPagerConfig,
  ResultsCategory,
  TaskObject,
  ResultsSimilarData,
  ResultsMissingData,
} from "../../types";
import ResultsIntroductionModal from "./ResultsIntroductionModal";
import ResultCard from "../../components/ResultCard";
import { tasksSelector } from "../../app/features/tasks/tasksSlice";
import { navigationRef } from "../../navigation/NavigationHelper";
import ThemedBackButton from "../../components/ThemedBackButton";
import { ICON_SIZE } from "../../helpers/config/config";

const HelpIcon = (props: any) => (
  <Icon
    {...props}
    name="question-mark-circle-outline"
    style={styles.helpIcon}
    fill="black"
  />
);

const config: ResultsViewPagerConfig[] = [
  {
    type: ResultsCategory.FAMILIARITY,
    color: "#9dcdfa",
  },
  {
    type: ResultsCategory.PREFERENCE,
    color: "#db9efa",
  },
  {
    type: ResultsCategory.PERSONALITY,
    color: "#999",
  },
  {
    type: ResultsCategory.BEST_FIT,
    color: "#a1e3a1",
  },
];

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ResultsPagerScreen = ({ navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const results = useAppSelector((state) => state.results);
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);
  const [pagePosition, setPagePosition] = useState(0);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    navigationRef.current = navigation;
  }, [navigation]);

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

  const handleSelectCategory = (type: string, occupation: string) => {
    navigation.navigate("ResultsDetails", {
      title: Object.values(config)[pagePosition].type,
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
    const temp = [...results.count];
    if (item.type === ResultsCategory.FAMILIARITY) {
      temp.sort((a, b) => b.similarTasks - a.similarTasks);
    } else if (item.type === ResultsCategory.PREFERENCE) {
      temp.sort((a, b) => b.preferenceScore - a.preferenceScore);
    } else if (item.type === ResultsCategory.PERSONALITY) {
      temp.sort((a, b) => b.riasecScore - a.riasecScore);
    } else if (item.type === ResultsCategory.BEST_FIT) {
      temp.sort((a, b) => b.similarityScore - a.similarityScore);
    }
    return (
      <View collapsable={false} key={String(index)}>
        <Item scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}>
          <FlatList
            renderItem={renderResults}
            data={temp.slice(0, 10)}
            contentContainerStyle={styles.contentContainer}
            keyExtractor={(e, i) => String(i)}
          />
        </Item>
      </View>
    );
  };

  return (
    <Layout style={styles.screen}>
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
      <ThemedBackButton style={styles.backButton} />
      <View style={styles.headerContainer}>
        <Ticker
          scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
          positionAnimatedValue={positionAnimatedValue}
          config={config}
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
        {config.map((item, index) => renderPage(item, index))}
      </AnimatedPagerView>
      <View style={styles.pageIndicator}>
        <Pagination
          scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
          positionAnimatedValue={positionAnimatedValue}
          config={config}
        />
      </View>
    </Layout>
  );
};

export default ResultsPagerScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backButton: {
    marginBottom: 12,
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
});
