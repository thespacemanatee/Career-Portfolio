import React, { useRef } from "react";
import { View, Animated } from "react-native";
import { Layout, StyleService, Button } from "@ui-kitten/components";
import PagerView from "react-native-pager-view";

import CustomText from "../../components/CustomText";
import Pagination from "../../components/pager/Pagination";
import type { PagerViewOnPageScrollEventData } from "../../types";
import Ticker from "../../components/pager/Ticker";
import TaskBarChart from "../../components/TaskBarChartDemo";
import Item from "../../components/pager/Item";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const config = [
  { type: "Your Options", color: "black" },
  { type: "Occupations", color: "black" },
];

const notRelevant = new Array(5);
const similar = new Array(10);
const missing = new Array(7);

const ResultsIntroductionModal = ({ onClose }: { onClose?: () => void }) => {
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;

  return (
    <Layout style={styles.layout}>
      <Ticker
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        positionAnimatedValue={positionAnimatedValue}
        config={config}
        fontSize={26}
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
          <Item scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}>
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
          </Item>
        </View>
        <View style={styles.pagerContent} key="2">
          <Item scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}>
            <View style={styles.readyContent}>
              <View />
              <View>
                <CustomText style={styles.contentText}>
                  Each occupation is made up of tasks.
                </CustomText>
                <CustomText bold style={styles.contentText}>
                  Tap for more information!
                </CustomText>
                <TaskBarChart
                  notRelevant={notRelevant}
                  similar={similar}
                  missing={missing}
                />
              </View>
              <Button onPress={onClose}>I&apos;M READY!</Button>
            </View>
          </Item>
        </View>
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

ResultsIntroductionModal.defaultProps = {
  onClose: () => {},
};

export default ResultsIntroductionModal;

const styles = StyleService.create({
  layout: {
    width: "100%",
    height: "100%",
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
    marginVertical: 5,
  },
});
