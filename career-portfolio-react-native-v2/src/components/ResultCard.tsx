import React from "react";
import { StyleService } from "@ui-kitten/components";

import { ResultsCountData, TaskBarChartData } from "../types";
import CustomText from "./CustomText";
import ShadowCard from "./ShadowCard";
import TaskBarChart from "./TaskBarChart";

const ResultCard = ({
  index,
  item,
  data,
  onSelectCategory,
}: {
  index: number;
  item: ResultsCountData;
  data: TaskBarChartData;
  onSelectCategory: (type: string, occupation: string) => void;
}) => {
  return (
    <ShadowCard style={styles.resultCard}>
      <CustomText
        style={styles.titleText}
      >{`${index}. ${item.title}`}</CustomText>
      <TaskBarChart
        notRelevant={10}
        similar={data.similar}
        missing={data.missing}
        occupation={item.title}
        onSelectCategory={onSelectCategory}
      />
    </ShadowCard>
  );
};

export default ResultCard;

const styles = StyleService.create({
  resultCard: {
    padding: 20,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
