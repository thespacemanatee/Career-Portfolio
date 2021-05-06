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
import type {
  PagerViewOnPageScrollEventData,
  ResultsCountData,
  ResultsViewPagerConfig,
} from "../../types";
import CustomText from "../../components/CustomText";
import ResultsIntroductionScreen from "./ResultsIntroductionModal";
import TaskBarChart from "../../components/TaskBarChart";
import ShadowCard from "../../components/ShadowCard";
import ResultCard from "../../components/ResultCard";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const HelpIcon = (props: any) => (
  <Icon {...props} name="question-mark-circle-outline" />
);

const config: ResultsViewPagerConfig[] = [
  {
    type: "Familiarity",
    color: "#9dcdfa",
  },
  {
    type: "Preference",
    color: "#db9efa",
  },
  {
    type: "Personality",
    color: "#999",
  },
  {
    type: "Best Fit",
    color: "#a1e3a1",
  },
];

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ResultsPagerScreen = ({ navigation }) => {
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;
  const results = useAppSelector((state) => state.results);
  const [visible, setVisible] = useState(true);

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

  const renderResults = ({ item }: { item: ResultsCountData }) => {
    const similar = results.similar.filter((e) => e.title === item.title);
    const missing = results.missing.filter((e) => e.title === item.title);
    const data = {
      notRelevant: 10,
      similar,
      missing,
    };
    return <ResultCard item={item} data={data} />;
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
              },
              useNativeDriver: true,
            }
          )}
        >
          {config.map((item, index) => (
            <View collapsable={false} key={String(index)}>
              <Item scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}>
                <FlatList
                  renderItem={renderResults}
                  data={results.count}
                  contentContainerStyle={styles.contentContainer}
                  keyExtractor={(e, i) => String(i)}
                />
              </Item>
            </View>
          ))}
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
    padding: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
