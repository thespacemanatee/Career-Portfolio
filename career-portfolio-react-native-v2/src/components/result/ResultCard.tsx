import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import CustomText from "../CustomText";
import RankIcon from "./RankIcon";
import ShadowCard from "../ShadowCard";
import {
  ResultsCategory,
  ResultsPieChartData,
  ResultsScores,
} from "../../types";
import ResultsPieChart from "./pieChart/ResultsPieChart";
import PieChartLegend from "./pieChart/PieChartLegend";

interface ResultCardProps {
  occupation: string;
  type: ResultsCategory;
  rank: number;
  data: ResultsPieChartData[];
  scores: ResultsScores;
  onPress: (
    data: ResultsPieChartData[],
    { preferenceScore, riasecScore, similarityScore }: ResultsScores
  ) => void;
}

const CARD_WIDTH = Dimensions.get("window").width / 1.2;
const CARD_HEIGHT = 350;

const ResultCard: React.FC<ResultCardProps> = ({
  occupation,
  type,
  rank,
  data,
  scores,
  onPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <ShadowCard
        style={styles.cardContent}
        onPress={() => {
          onPress(data, scores);
        }}
      >
        <RankIcon rank={rank} style={styles.rankIcon} />
        <View style={styles.pieChartContainer}>
          <ResultsPieChart data={data} size={100} />
          <PieChartLegend data={data} />
        </View>
        <View>
          {type === ResultsCategory.FAMILIARITY && (
            <CustomText style={styles.scoreText}>{`Familiarity Score: ${(
              scores.similarTasksScore * 100
            ).toFixed(1)}%`}</CustomText>
          )}
          {type === ResultsCategory.PREFERENCE && (
            <CustomText style={styles.scoreText}>{`Preference Score: ${(
              scores.preferenceScore * 100
            ).toFixed(1)}%`}</CustomText>
          )}
          {type === ResultsCategory.PERSONALITY && (
            <CustomText style={styles.scoreText}>{`Personality Score: ${(
              scores.riasecScore * 100
            ).toFixed(1)}%`}</CustomText>
          )}
          {type === ResultsCategory.BEST_FIT && (
            <CustomText style={styles.scoreText}>{`Best Fit Score: ${(
              scores.similarityScore * 100
            ).toFixed(1)}%`}</CustomText>
          )}
        </View>
        <CustomText numberOfLines={2} style={styles.occupationText}>
          {occupation}
        </CustomText>
      </ShadowCard>
    </View>
  );
};

export default ResultCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginRight: 16,
    marginVertical: 16,
  },
  cardContent: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 16,
    padding: 16,
    justifyContent: "space-between",
  },
  rankIcon: {
    position: "absolute",
    left: 16,
    top: 16,
  },
  pieChartContainer: {
    alignItems: "center",
  },
  scoreText: {
    fontSize: 20,
  },
  occupationText: {
    fontSize: 24,
  },
});