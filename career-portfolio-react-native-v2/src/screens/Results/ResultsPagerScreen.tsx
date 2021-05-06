/* eslint-disable global-require */
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
import type { PagerViewOnPageScrollEventData } from "../../types";

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const data = [
  {
    type: "Humlan P",
    heading: "Vibrant colors",
    description: "Four on-trend colorways to seamlessly suit your style.",
    key: "first",
    color: "#9dcdfa",
  },
  {
    type: "Pampas",
    heading: "Redefined sound",
    description: "A bold statement tuned to perfection.",
    key: "second",
    color: "#db9efa",
  },
  {
    type: "Humlan P",
    heading: "Great quality",
    description:
      "An Urbanears classic! Listen-all-day fit. Striking the perfect balance of effortless technology",
    key: "third",
    color: "#999",
  },
  {
    type: "Humlan B",
    heading: "From Sweden",
    description:
      "The “Plattan” in Plattan headphones is Swedish for “the slab.”",
    key: "fourth",
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
          data={data}
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
          {data.map((item, index) => (
            <View collapsable={false} key={String(index)}>
              <Item
                {...item}
                scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
              />
            </View>
          ))}
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
  },
});
