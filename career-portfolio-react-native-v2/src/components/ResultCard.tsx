import React from "react";
import { StyleService } from "@ui-kitten/components";

import { ResultsCountData } from "../types";
import CustomText from "./CustomText";
import ShadowCard from "./ShadowCard";
import TaskBarChart from "./TaskBarChart";

const ResultCard = ({
  index,
  item,
  similar,
  missing,
  notRelevant,
  onSelectCategory,
}: {
  index: number;
  item: ResultsCountData;
  similar: number;
  missing: number;
  notRelevant: number;
  onSelectCategory: (type: string, occupation: string) => void;
}) => {
  return (
    <ShadowCard style={styles.resultCard}>
      <CustomText
        style={styles.titleText}
      >{`${index}. ${item.title}`}</CustomText>
      <TaskBarChart
        notRelevant={notRelevant}
        similar={similar}
        missing={missing}
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
