import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import CustomText from "../CustomText";
import RankIcon from "./RankIcon";
import ShadowCard from "../ShadowCard";
import { ResultsPieChartData } from "../../types";
import ResultsPieChart from "./pieChart/ResultsPieChart";
import PieChartLegend from "./pieChart/PieChartLegend";

interface ResultCardProps {
  occupation: string;
  rank: number;
  data: ResultsPieChartData[];
  onPress: (data: ResultsPieChartData[]) => void;
}

const CARD_WIDTH = Dimensions.get("window").width / 1.2;
const CARD_HEIGHT = 300;

const ResultCard: React.FC<ResultCardProps> = ({
  occupation,
  rank,
  data,
  onPress,
}) => {
  return (
    <View style={styles.cardContainer}>
      <ShadowCard
        style={styles.cardContent}
        onPress={() => {
          onPress(data);
        }}
      >
        <RankIcon rank={rank} style={styles.rankIcon} />
        <View style={styles.pieChartContainer}>
          <ResultsPieChart data={data} size={100} />
          <PieChartLegend data={data} />
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
  occupationText: {
    fontSize: 24,
  },
});
