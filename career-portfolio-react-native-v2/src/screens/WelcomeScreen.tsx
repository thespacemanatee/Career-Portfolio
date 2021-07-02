import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import {
  Divider,
  Layout,
  TopNavigation,
  StyleService,
  Button,
} from "@ui-kitten/components";
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import CustomText from "../components/CustomText";
import { useAppSelector } from "../app/hooks";
import { LottieView } from "..";

const WelcomeScreen = ({ navigation }) => {
  const count = useAppSelector((state) => state.results.count);
  const [progress, setProgress] = useState(0);
  const animationProgress = useSharedValue(0);

  const { height } = Dimensions.get("window");

  useDerivedValue(() => {
    runOnJS(setProgress)(animationProgress.value);
  }, [animationProgress]);

  useEffect(() => {
    animationProgress.value = withRepeat(
      withTiming(1, {
        duration: 2500,
      }),
      -1,
      true
    );
  }, [animationProgress]);

  const handleNext = () => {
    navigation.navigate("Occupations");
  };
  const handleViewResults = () => {
    navigation.navigate("ResultsStack");
  };
  return (
    <View style={styles.screen}>
      <TopNavigation title="Welcome" alignment="center" />
      <Divider />
      <Layout style={styles.layout}>
        <View />
        <View>
          <View style={{ height: height / 3 }}>
            <LottieView
              // eslint-disable-next-line global-require
              source={require("../../assets/welcome-hero.json")}
              progress={progress}
            />
          </View>
          <CustomText bold style={styles.title}>
            Discovering Your Options
          </CustomText>
        </View>
        <View>
          <Button style={styles.button} onPress={handleNext}>
            START
          </Button>
          <Button
            disabled={count === null}
            appearance="outline"
            onPress={handleViewResults}
          >
            VIEW RESULTS
          </Button>
        </View>
      </Layout>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    fontSize: 40,
    textAlign: "center",
  },
  button: {
    marginBottom: 10,
  },
});
