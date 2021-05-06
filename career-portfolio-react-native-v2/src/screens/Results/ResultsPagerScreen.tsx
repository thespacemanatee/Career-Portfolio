import React from "react";
import { StyleSheet, View, Animated, Platform } from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  Icon,
  TopNavigationAction,
} from "@ui-kitten/components";

import PagerView from "react-native-pager-view";
import Item from "../../components/pager/Item";
import Pagination from "../../components/pager/Pagination";
import Ticker from "../../components/pager/Ticker";
import type {
  PagerViewOnPageScrollEventData,
  ResultsViewPagerConfig,
} from "../../types";
import CustomText from "../../components/CustomText";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

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
                <CustomText>HELLO</CustomText>
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
});
