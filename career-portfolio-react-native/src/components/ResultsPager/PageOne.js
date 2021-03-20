import React from "react";
import { View, Text } from "react-native";

const Page = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 30,
      }}
    >
      {/* <View style={{ marginTop: 16 }}> */}
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>YOUR OPTIONS</Text>
      <View>
        <Text style={{ marginTop: 20 }}>
          Here, we show you jobs related to your tasks by:
        </Text>
        <Text style={{ marginTop: 20 }}>
          1. Familiarity (jobs with similar tasks)
        </Text>
        <Text style={{ marginTop: 20 }}>
          2. Preference (based on your ranking of tasks)
        </Text>
        <Text style={{ marginTop: 20 }}>
          3. Personality (jobs of people whose personality are similar to yours)
        </Text>
        <Text style={{ marginTop: 20 }}>
          4. Best Fit (combination of the above)
        </Text>
      </View>
      {/* </View> */}
    </View>
  );
};

export default Page;
