import React, { useCallback, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { JobClass } from "../app/features/jobClass";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { CTAButton } from "../components/ui/CTAButton";
import { JobClassEntry } from "../components/ui/JobClassEntry";
import type { RootStackParamList } from "../navigation";
import { SPACING } from "../resources";
import { resetTasksState, setRecommendedTasks } from "../app/features/tasks";
import { getRecommendedTasks } from "../services";
import { toTopRecommendedTask } from "../utils";

type JobClassScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Job Class"
>;

export const JobClassScreen = ({ navigation }: JobClassScreenProps) => {
  const [selectedJobClass, setSelectedJobClass] = useState<JobClass>();
  const jobClasses = useAppSelector((state) => state.jobClass.jobClasses);

  const dispatch = useAppDispatch();

  const submitSelection = async () => {
    if (!selectedJobClass) {
      return;
    }
    dispatch(resetTasksState());
    try {
      const { data } = await getRecommendedTasks(selectedJobClass, []);
      const tasks = toTopRecommendedTask(JSON.parse(data.tasks));
      dispatch(setRecommendedTasks(tasks));
      navigation.navigate("Tasks", {
        selectedJobClass,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const selectJobClass = (jobClass: JobClass) => {
    setSelectedJobClass(jobClass);
  };

  const renderJobClasses = useCallback(
    ({ item }: { item: JobClass }) => {
      return (
        <JobClassEntry
          isSelected={selectedJobClass === item}
          onPress={selectJobClass}
          jobClass={item}
          style={styles.jobClassEntry}
        />
      );
    },
    [selectedJobClass]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobClasses}
        renderItem={renderJobClasses}
        keyExtractor={(item) => item.title}
      />
      <CTAButton
        label="Continue"
        onPress={submitSelection}
        disabled={!selectedJobClass}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.spacing16,
  },
  jobClassEntry: {
    marginVertical: SPACING.spacing4,
  },
});
