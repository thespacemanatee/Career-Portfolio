import React from "react";
import type { ImageSourcePropType } from "react-native";
import { Platform, View, StyleSheet, Dimensions, Image } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import { SPACING } from "../../resources";

const { width: wWidth } = Dimensions.get("window");

const SNAP_POINTS = [-wWidth, 0, wWidth];
const aspectRatio = 3 / 2;
const CARD_WIDTH = wWidth - SPACING.spacing64;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;

interface SwipeableTaskCardProps {
  source: ImageSourcePropType;
}

export const SwipeableTaskCard = ({ source }: SwipeableTaskCardProps) => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      const newX = ctx.x + translationX;
      translateX.value = newX;
      rotate.value = newX / 10;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: velocityX });
      rotate.value = withTiming(0);
    },
  });

  if (Platform.OS === "web") {
    return (
      <View style={styles.container} pointerEvents="box-none">
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.card, style]}>
            <Image
              source={source}
              style={{
                width: CARD_WIDTH,
                height: CARD_WIDTH * aspectRatio,
              }}
              resizeMode="contain"
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }

  const gesture = Gesture.Pan()
    .onBegin(() => {
      offset.value.x = translateX.value;
    })
    .onUpdate(({ translationX }) => {
      const newX = offset.value.x + translationX;
      translateX.value = newX;
      rotate.value = newX / 10;
    })
    .onEnd(({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: velocityX });
      rotate.value = withTiming(0);
    });

  return (
    <View style={styles.container} pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, style]}>
          <Image
            source={source}
            style={{
              width: CARD_WIDTH,
              height: CARD_WIDTH * aspectRatio,
            }}
            resizeMode="contain"
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    overflow: "hidden",
  },
});
