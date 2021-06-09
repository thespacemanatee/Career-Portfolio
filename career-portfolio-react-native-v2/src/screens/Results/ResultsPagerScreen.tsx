import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Platform,
  useWindowDimensions,
  FlatList,
} from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  Icon,
  TopNavigationAction,
  Modal,
  Card,
} from "@ui-kitten/components";
import PagerView from "react-native-pager-view";

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
} from "../../types";
import ResultsIntroductionScreen from "./ResultsIntroductionModal";
import ResultCard from "../../components/ResultCard";
import { tasksSelector } from "../../app/features/tasks/tasksSlice";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props: any) => (
  <Icon {...props} name="question-mark-circle-outline" />
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
  const [visible, setVisible] = useState(true);
  const [pagePosition, setPagePosition] = useState(0);

  const { width, height } = useWindowDimensions();

  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => {
        if (Platform.OS === "web") {
          window.history.back();
        } else {
          navigation.goBack();
        }
      }}
    />
  );

  const HelpAction = () => (
    <TopNavigationAction
      icon={HelpIcon}
      onPress={() => {
        setVisible(true);
      }}
    />
  );

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
    const similar = results.similar.filter((e) => e.title === item.title);
    const missing = results.missing.filter((e) => e.title === item.title);
    const notRelevant: TaskObject[] = [];
    tasks
      .filter((e) => {
        return results.similar.filter((d) => e.IWA_Title !== d.similarIWA);
      })
      .forEach((e) => {
        if (!notRelevant.some((v: TaskObject) => v.IWA_Title === e.IWA_Title)) {
          notRelevant.push(e);
        }
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
    <View style={styles.screen}>
      <TopNavigation
        title="Results"
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={HelpAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={handleCloseHelp}
        >
          <Card
            disabled
            style={{
              height: (height / 4) * 3,
              width: (width / 4) * 3,
            }}
          >
            <ResultsIntroductionScreen onClose={handleCloseHelp} />
          </Card>
        </Modal>
        <Ticker
          scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
          positionAnimatedValue={positionAnimatedValue}
          config={config}
        />
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
    </View>
  );
};

export default ResultsPagerScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  layout: {
    flex: 1,
    padding: 10,
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
    padding: 15,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
