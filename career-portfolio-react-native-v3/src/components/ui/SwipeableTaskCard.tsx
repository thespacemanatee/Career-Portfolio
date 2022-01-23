import React from "react";
import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Dimensions, Image } from "react-native";
import type { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

import { SPACING } from "../../resources";

const { width: wWidth } = Dimensions.get("window");

const SNAP_POINTS = [-wWidth, 0, wWidth];
const aspectRatio = 3 / 2;
const CARD_WIDTH = wWidth - 64;

interface SwipeableTaskCardProps {
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
}

export const SwipeableTaskCard = ({
  source,
  style,
}: SwipeableTaskCardProps) => {
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({ translationX }, ctx) => {
      translateX.value = ctx.x + translationX;
      rotate.value = (ctx.x + translationX) / 10;
    },
    onEnd: ({ velocityX }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, { velocity: velocityX });
      rotate.value = withTiming(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return (
    <GestureHandlerRootView
      style={[styles.container, style]}
      pointerEvents="box-none"
    >
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.card, animatedStyle]}>
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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SPACING.spacing16,
    overflow: "hidden",
  },
});
