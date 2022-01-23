import React, { useCallback, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import type { JobClass } from "../app/features/jobClass";
import { useAppSelector } from "../app/hooks";
import { CTAButton } from "../components/ui/CTAButton";
import { JobClassEntry } from "../components/ui/JobClassEntry";
import { SPACING } from "../resources";

export const JobClassScreen = () => {
  const [selectedJobClass, setSelectedJobClass] = useState<JobClass>();
  const jobClasses = useAppSelector((state) => state.jobClass.jobClasses);

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
      <CTAButton label="Continue" />
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
