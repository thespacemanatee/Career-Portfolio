import React from "react";
import { StyleService } from "@ui-kitten/components";

import { ResultsCountData, TaskBarChartProps } from "../types";
import CustomText from "./CustomText";
import ShadowCard from "./ShadowCard";
import TaskBarChart from "./TaskBarChart";

interface ResultCardProps {
  index: number;
  item: ResultsCountData;
  data: TaskBarChartProps;
}

const ResultCard = (props: ResultCardProps) => {
  const { index, item, data } = props;
  return (
    <ShadowCard style={styles.resultCard}>
      <CustomText
        style={styles.titleText}
      >{`${index}. ${item.title}`}</CustomText>
      <TaskBarChart
        notRelevant={10}
        similar={data.similar}
        missing={data.missing}
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
