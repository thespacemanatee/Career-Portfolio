import { StyleSheet } from "react-native";
import React, { forwardRef, useMemo } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { ThemedText } from "../../components/typography";
import { FONT_SIZE, SPACING } from "../../resources";
import type { JobClass } from "../../app/features/jobClass";
import { JobClassEntry } from "../../components/ui/JobClassEntry";
import { SwipedTaskCard } from "../../components/ui/SwipedTaskCard";
import { CTAButton } from "../../components/ui/CTAButton";

type SwipedTasksBottomSheetProps = {
  swipedTasks: string[];
  jobClass: JobClass;
};

export const SwipedTasksBottomSheet = forwardRef<
  BottomSheet,
  SwipedTasksBottomSheetProps
>(({ swipedTasks, jobClass }, ref) => {
  const snapPoints = useMemo(() => ["75%"], []);

  const submitTasks = () => {};

  const renderSwipedTasks = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    return <SwipedTaskCard task={item} index={index} style={styles.taskCard} />;
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={({ animatedIndex, animatedPosition }) => (
        <BottomSheetBackdrop
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
          pressBehavior="none"
          enableTouchThrough
          disappearsOnIndex={-1}
          style={StyleSheet.absoluteFill}
        />
      )}
    >
      <BottomSheetView style={styles.titleContainer}>
        <ThemedText style={styles.titleText}>Collection of my tasks</ThemedText>
        <JobClassEntry
          isSelected
          jobClass={jobClass}
          style={styles.jobClassEntry}
        />
      </BottomSheetView>
      <BottomSheetFlatList
        data={swipedTasks}
        keyExtractor={(i) => i}
        renderItem={renderSwipedTasks}
        numColumns={2}
        contentContainerStyle={styles.flatList}
      />
      <CTAButton
        label="Confirm & Generate"
        onPress={submitTasks}
        disabled={swipedTasks.length === 0}
        style={styles.confirmButton}
      />
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "bold",
    fontSize: FONT_SIZE.large,
    textAlign: "center",
  },
  titleContainer: {
    margin: SPACING.spacing16,
  },
  jobClassEntry: {
    marginTop: SPACING.spacing20,
  },
  flatList: {
    backgroundColor: "white",
    padding: SPACING.spacing8,
  },
  taskCard: {
    margin: SPACING.spacing8,
  },
  confirmButton: {
    marginHorizontal: SPACING.spacing16,
    marginBottom: SPACING.spacing16,
  },
});
