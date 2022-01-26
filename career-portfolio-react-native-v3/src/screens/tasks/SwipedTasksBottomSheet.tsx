import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";

import { ThemedText } from "../../components/typography";
import { ELEVATION, FONT_SIZE, SPACING } from "../../resources";
import type { JobClass } from "../../app/features/jobClass";
import { JobClassEntry } from "../../components/ui/JobClassEntry";
import { SwipedTaskCard } from "../../components/ui/SwipedTaskCard";
import { CTAButton } from "../../components/ui/CTAButton";

type SwipedTasksBottomSheetProps = {
  swipedTasks: string[];
  jobClass: JobClass;
  visible: boolean;
  onToggle?: () => void;
};

export const SwipedTasksBottomSheet = ({
  swipedTasks,
  jobClass,
  visible,
  onToggle,
}: SwipedTasksBottomSheetProps) => {
  const { height } = useWindowDimensions();

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
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onToggle}
    >
      <Pressable style={styles.container} onPress={onToggle}>
        <Pressable style={[{ height: height / 1.5 }, styles.modalView]}>
          <View style={styles.titleContainer}>
            <ThemedText style={styles.titleText}>
              Collection of my tasks
            </ThemedText>
            <JobClassEntry
              isSelected
              jobClass={jobClass}
              style={styles.jobClassEntry}
            />
          </View>
          <FlatList
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
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00000099",
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    borderTopStartRadius: SPACING.spacing12,
    borderTopEndRadius: SPACING.spacing12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: ELEVATION.elevation6,
  },
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
