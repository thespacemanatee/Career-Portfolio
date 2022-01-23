import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import type { JobClass } from "../app/features/jobClass";
import { useAppSelector } from "../app/hooks";
import { JobClassEntry } from "../components/ui/JobClassEntry";
import { SearchTextInput } from "../components/ui/SearchTextInput";
import { SPACING } from "../resources";
import { searchOccupations } from "../services";

export const JobClassScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const [debounceTimeout, setDebounceTimeout] =
    useState<ReturnType<typeof setTimeout>>();
  const jobClasses = useAppSelector((state) => state.jobClass.jobClasses);

  const debounce = (func: () => void, timeout = 300) => {
    return (...args) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      setDebounceTimeout(
        setTimeout(() => {
          func.apply(this, args);
        }, timeout)
      );
    };
  };

  const search = useCallback(async () => {
    try {
      const res = await searchOccupations(searchValue);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }, [searchValue]);

  useEffect(() => {
    debounce(() => search())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const renderJobClasses = useCallback(({ item }: { item: JobClass }) => {
    return <JobClassEntry jobClass={item} style={styles.jobClassEntry} />;
  }, []);

  return (
    <View style={styles.container}>
      <SearchTextInput value={searchValue} onChangeText={setSearchValue} />
      <FlatList data={jobClasses} renderItem={renderJobClasses} />
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
