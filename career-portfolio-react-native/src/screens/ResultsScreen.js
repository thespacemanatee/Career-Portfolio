import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import ViewPager from "react-native-pager-view";
import { useDispatch, useSelector } from "react-redux";

import PageOne from "../components/ResultsPager/PageOne";
import PageTwo from "../components/ResultsPager/PageTwo";
import Footer from "../components/ResultsPager/Footer";

const ResultsScreen = ({ route, navigation }) => {
  const results = useSelector((state) => state.database.result);

  const pagerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };
  console.log(results);
  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key="1">
          <PageOne />
          <Footer
            // backgroundColor="#ffc93c"
            rightButtonLabel="Next"
            rightButtonPress={() => {
              handlePageChange(1);
            }}
          />
        </View>
        <View key="2">
          <PageTwo />
          <Footer
            // backgroundColor="#07689f"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(0);
            }}
          />
        </View>
      </ViewPager>
    </View>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({});
