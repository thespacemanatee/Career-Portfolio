import React, { useEffect } from "react";
import { Dimensions, View } from "react-native";
import { Layout, StyleService, Button } from "@ui-kitten/components";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import CustomText from "../components/CustomText";
import { useAppSelector } from "../app/hooks";
import { LottieView } from "..";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const WelcomeScreen = ({ navigation }) => {
  const count = useAppSelector((state) => state.results.count);
  const animationProgress = useSharedValue(0);

  const { height } = Dimensions.get("window");

  const animatedProps = useAnimatedProps(() => {
    return {
      progress: animationProgress.value,
    };
  });

  useEffect(() => {
    animationProgress.value = withRepeat(
      withTiming(1, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
      true
    );
  }, [animationProgress]);

  const handleNext = () => {
    navigation.navigate("CreateSubmission");
  };
  const handleViewResults = () => {
    navigation.navigate("ResultsStack");
  };
  return (
    <View style={styles.screen}>
      <Layout style={styles.layout}>
        <View />
        <View>
          <View style={{ height: height / 3 }}>
            <AnimatedLottieView
              // eslint-disable-next-line global-require
              source={require("../../assets/welcome-hero.json")}
              animatedProps={animatedProps}
            />
          </View>
          <CustomText fontFamily="bold" style={styles.title}>
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
