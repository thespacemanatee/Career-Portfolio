import React, { useCallback, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Divider, StyleService, useTheme } from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { tasksSelector } from "../app/features/tasks/tasksSlice";
import CustomText from "../components/CustomText";
import TaskCard from "../components/TaskCard";
import { useAppSelector } from "../app/hooks";
import ListEmptyComponent from "../components/ListEmptyComponent";
import SectionTitle from "../components/SectionTitle";
import {
  navigationRef,
  submissionProgressRef,
} from "../navigation/NavigationHelper";
import AnimatedFab from "../components/AnimatedFab";
import { TaskObject } from "../types";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const CoreTasksScreen = ({ route, navigation }) => {
  const tasks = useAppSelector(tasksSelector.selectAll);
  const offsetY = useSharedValue(0);
  const showButton = useSharedValue(true);
  const [coreTasks, setCoreTasks] = useState<TaskObject[]>();

  const { id, editing } = route.params || {};

  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      navigationRef.current = navigation;
      submissionProgressRef.current = 1;
    }, [navigation])
  );

  useEffect(() => {
    setCoreTasks(tasks.filter((e) => e.task_type !== "life"));
  }, [tasks]);

  const handleNavigation = () => {
    navigation.navigate("LifeTasksStack", {
      screen: "LifeTasks",
      params: { id, editing },
    });
  };

  const renderTasks = (itemData) => {
    return <TaskCard taskObject={itemData.item} />;
  };

  const renderEmptyComponent = () => (
    <ListEmptyComponent label="NO TASKS FOUND" />
  );

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const currentOffset = event.contentOffset.y;
    showButton.value = !(currentOffset > 0 && currentOffset > offsetY.value);
    offsetY.value = currentOffset;
  });

  return (
    <View style={styles.screen}>
      <SectionTitle
        title="What does your work schedule look like?"
        style={styles.sectionTitle}
      >
        <CustomText style={styles.subtitle} fontFamily="semiBold">
          Select the tasks that are{" "}
          <CustomText style={{ color: theme["color-primary-500"] }}>
            core
          </CustomText>{" "}
          to your work experience. Swipe right to delete tasks you&apos;ve never
          done before.
        </CustomText>
      </SectionTitle>
      <AnimatedFlatList
        onScroll={scrollHandler}
        style={styles.flatList}
        renderItem={renderTasks}
        data={coreTasks}
        keyExtractor={(item: TaskObject) => String(item.taskId)}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={renderEmptyComponent}
        ItemSeparatorComponent={() => <Divider />}
      />
      <AnimatedFab
        icon="chevron-right"
        label="Next"
        onPress={handleNavigation}
        style={styles.fab}
        showLabel={showButton}
      />
    </View>
  );
};

export default CoreTasksScreen;

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
  sectionTitle: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 14,
  },
  flatList: {
    marginVertical: 5,
  },
  contentContainer: {
    flexGrow: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
