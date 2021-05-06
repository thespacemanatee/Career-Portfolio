import React from "react";
import { View, Platform, Animated } from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  StyleService,
  Button,
  Icon,
  TopNavigationAction,
} from "@ui-kitten/components";
import PagerView from "react-native-pager-view";

import CustomText from "../../components/CustomText";
import Pagination from "../../components/pager/Pagination";
import type { PagerViewOnPageScrollEventData } from "../../types";
import Ticker from "../../components/pager/Ticker";
import TaskBarChart from "../../components/TaskBarChart";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const data = [
  { type: "Your Options", color: "black" },
  { type: "Occupations", color: "black" },
];

const notRelevant = new Array(5);
const similar = new Array(10);
const missing = new Array(7);

const ResultsIntroductionScreen = ({ navigation }) => {
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;

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

  const handleNavigation = () => {
    navigation.navigate("ResultsPager");
  };

  const inputRangeOpacity = [0, 0.5, 0.99];

  const opacity = scrollOffsetAnimatedValue.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [1, 0, 1],
  });

  return (
    <View style={styles.screen}>
      <TopNavigation
        title="Results"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        <Ticker
          scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
          positionAnimatedValue={positionAnimatedValue}
          data={data}
        />
        <AnimatedPagerView
          style={styles.pagerView}
          initialPage={0}
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
              useNativeDriver: true,
            }
          )}
        >
          <View style={styles.pagerContent} key="1">
            <Animated.View
              style={[
                styles.contentContainer,
                {
                  opacity,
                },
              ]}
            >
              <CustomText style={styles.contentText}>
                Here, we show you jobs related to your tasks by:
              </CustomText>
              <CustomText style={styles.contentText}>
                1.{" "}
                <CustomText bold style={styles.contentText}>
                  Familiarity{" "}
                </CustomText>
                (jobs with similar tasks)
              </CustomText>
              <CustomText style={styles.contentText}>
                2.{" "}
                <CustomText bold style={styles.contentText}>
                  Preference{" "}
                </CustomText>{" "}
                (based on your ranking of tasks)
              </CustomText>
              <CustomText style={styles.contentText}>
                3.{" "}
                <CustomText bold style={styles.contentText}>
                  Personality{" "}
                </CustomText>{" "}
                (jobs of people whose personality are similar to yours)
              </CustomText>
              <CustomText style={styles.contentText}>
                4.{" "}
                <CustomText bold style={styles.contentText}>
                  Best Fit{" "}
                </CustomText>{" "}
                (combination of the above)
              </CustomText>
            </Animated.View>
          </View>
          <View style={styles.pagerContent} key="2">
            <Animated.View
              style={[
                styles.contentContainer,
                {
                  opacity,
                },
              ]}
            >
              <View style={styles.readyContent}>
                <CustomText style={styles.contentText}>
                  Each occupation is made up of tasks.
                </CustomText>
                <TaskBarChart
                  notRelevant={notRelevant}
                  similar={similar}
                  missing={missing}
                />
                <Button onPress={handleNavigation}>I&apos;M READY!</Button>
              </View>
            </Animated.View>
          </View>
        </AnimatedPagerView>
        <View style={styles.pageIndicator}>
          <Pagination
            scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
            positionAnimatedValue={positionAnimatedValue}
            data={data}
          />
        </View>
      </Layout>
    </View>
  );
};

export default ResultsIntroductionScreen;

const styles = StyleService.create({
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
  pagerContent: {
    flex: 1,
  },
  titleText: {
    fontSize: 36,
    textAlign: "center",
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    margin: 20,
  },
  contentText: {
    fontSize: 18,
    marginVertical: 10,
  },
  readyContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  pageIndicator: {
    alignItems: "center",
  },
});
