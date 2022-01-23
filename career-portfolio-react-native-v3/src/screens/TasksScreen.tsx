import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { SwipeableTaskCard } from "../components/ui/SwipeableTaskCard";

export const TasksScreen = () => {
  const tasks = useMemo(() => Array(10).fill(0), []);

  return (
    <View style={styles.container}>
      {tasks.map((task, idx) => {
        return (
          <SwipeableTaskCard
            key={idx}
            source={{ uri: `https://picsum.photos/id/${idx + 10}/200/300` }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
