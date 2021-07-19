import { useTheme } from "@ui-kitten/components";
import React, { useMemo, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PieChart } from "react-native-svg-charts";

import Colors from "../../helpers/config/color";
import CustomText from "../CustomText";
import ShadowCard from "../ShadowCard";

interface ResultCardProps {
  id: string;
  data: {
    tasks: string[];
    color: Colors;
  }[];
  onPress: (id, data) => void;
}

const CARD_WIDTH = Dimensions.get("window").width / 1.4;
const CARD_HEIGHT = Dimensions.get("window").height / 2;

const labelTexts = ["Similar", "Missing", "Unrelated"];

const ResultCard: React.FC<ResultCardProps> = ({ id, data, onPress }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(null);

  const theme = useTheme();

  const pieData = useMemo(() => {
    return data.map((object, index) => {
      return {
        value: object.tasks.length,
        svg: {
          fill:
            selectedIndex === index ? theme["color-primary-500"] : object.color,
          onPress: () => {
            setSelectedIndex(index);
          },
        },
        key: `${index}`,
        arc: { outerRadius: selectedIndex === index ? "110%" : "100%" },
      };
    });
  }, [data, selectedIndex, theme]);

  return (
    <View style={styles.cardContainer}>
      <ShadowCard
        style={styles.card}
        onPress={() => {
          onPress(id, data);
        }}
      >
        <PieChart
          data={pieData}
          style={styles.pieChart}
          innerRadius="70%"
          outerRadius="90%"
        >
          {selectedIndex !== null && (
            <View style={styles.pieChartChild}>
              <CustomText style={styles.progressText}>
                {data[selectedIndex].tasks.length}
              </CustomText>
              <CustomText>{`${labelTexts[selectedIndex]} Tasks`}</CustomText>
            </View>
          )}
        </PieChart>
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
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 16,
    padding: 16,
  },
  pieChart: {
    height: 200,
  },
  pieChartChild: {
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    fontSize: 32,
  },
});
