/* eslint-disable camelcase */
import React, { useState } from "react";
import { View } from "react-native";
import { StyleService, Button } from "@ui-kitten/components";

import { addLifeTask, removeLifeTask } from "../app/features/tasks/tasksSlice";
import { TaskType } from "../types";
import BaseTaskCard from "./BaseTaskCard";
import { useAppDispatch } from "../app/hooks";

const TaskSearchResultCard = ({ taskObject, exists }) => {
  const [added, setAdded] = useState(exists);

  const { task, taskId, IWA_Title } = taskObject;

  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    if (added) {
      dispatch(removeLifeTask(taskId));
      setAdded(false);
    } else {
      dispatch(
        addLifeTask({ task, taskId, IWA_Title, task_type: TaskType.LIFE })
      );
      setAdded(true);
    }
  };

  return (
    <View>
      <BaseTaskCard task={task} />
      <View style={styles.footerContainer}>
        <Button
          onPress={handleAddTask}
          style={styles.footerControl}
          size="small"
          status={added ? "danger" : null}
        >
          {added ? "REMOVE TASK" : "ADD TASK"}
        </Button>
      </View>
    </View>
  );
};

export default TaskSearchResultCard;

const styles = StyleService.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 6,
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
