import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleService,
  Button,
  ButtonGroup,
  useTheme,
  Divider,
} from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import {
  tasksSelector,
  resetLifeTasks,
} from "../app/features/tasks/tasksSlice";
import CustomText from "../components/CustomText";
import LifeTaskCard from "../components/LifeTaskCard";
import ListEmptyComponent from "../components/ListEmptyComponent";
import SectionTitle from "../components/SectionTitle";
import {
  navigationRef,
  submissionProgressRef,
} from "../navigation/NavigationHelper";
import { TaskObject, TaskType } from "../types";
import AnimatedFab from "../components/AnimatedFab";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const LifeTasksScreen = ({ route, navigation }) => {
  const tasks = useSelector(tasksSelector.selectAll);
  const offsetY = useSharedValue(0);
  const showButton = useSharedValue(true);
  const [lifeTasks, setLifeTasks] = useState<TaskObject[]>();

  const { id, editing } = route.params || {};

  const dispatch = useDispatch();

  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      navigationRef.current = navigation;
      submissionProgressRef.current = 2;
    }, [navigation])
  );

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLifeTasks(tasks.filter((e) => e.task_type === TaskType.LIFE));
  }, [tasks]);

  const handleNavigation = () => {
    navigation.navigate("Rankings", { id, editing });
  };

  const handleResetLifeTasks = () => {
    Alert.alert("Are you sure?", "This will reset your life tasks!", [
      {
        text: "Confirm",
        style: "destructive",
        onPress: () => {
          dispatch(resetLifeTasks(lifeTasks.map((e) => e.taskId)));
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const renderTasks = (itemData) => {
    return <LifeTaskCard taskObject={itemData.item} />;
  };

  const renderEmptyComponent = () => <ListEmptyComponent label="NO TASKS" />;

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const currentOffset = event.contentOffset.y;
    showButton.value = !(currentOffset > 0 && currentOffset > offsetY.value);
    offsetY.value = currentOffset;
  });

  return (
    <View style={styles.screen}>
      <SectionTitle
        title="What other tasks have you done in past jobs, or outside work?"
        style={styles.sectionTitle}
      >
        <CustomText style={styles.subtitle} fontFamily="semiBold">
          A task is made up of an{" "}
          <CustomText style={{ color: theme["color-primary-500"] }}>
            action
          </CustomText>
          , object and purpose.
        </CustomText>
        <CustomText style={styles.subtitle} fontFamily="semiBold">
          Example: Interview (action) people (object) to understand perspective
          on current social trends (purpose).
        </CustomText>
      </SectionTitle>
      <CustomText style={styles.buttonGroupTitle} fontFamily="bold">
        Search task by:
      </CustomText>
      <View style={styles.controlContainer}>
        <ButtonGroup appearance="outline">
          <Button
            onPress={() => {
              navigation.navigate("AddByAction");
            }}
          >
            Action
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("AddByOccupation");
            }}
          >
            Occupation
          </Button>
        </ButtonGroup>
        {lifeTasks?.length > 0 ? (
          <Button
            onPress={handleResetLifeTasks}
            appearance="ghost"
            status="basic"
          >
            CLEAR
          </Button>
        ) : null}
      </View>
      <AnimatedFlatList
        onScroll={scrollHandler}
        style={styles.flatList}
        renderItem={renderTasks}
        data={lifeTasks}
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

export default LifeTasksScreen;

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
  buttonGroupTitle: {
    marginBottom: 6,
    paddingHorizontal: 16,
  },
  controlContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
