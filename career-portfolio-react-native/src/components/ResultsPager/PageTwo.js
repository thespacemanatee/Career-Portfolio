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
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>OCCUPATION</Text>
      <View>
        <Text style={{ marginTop: 20 }}>
          Each occupation is made up of tasks.
        </Text>
      </View>
      {/* </View> */}
    </View>
  );
};

export default Page;
