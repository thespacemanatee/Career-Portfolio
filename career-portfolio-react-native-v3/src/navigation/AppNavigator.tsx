import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";

import { JobClassScreen } from "../screens/JobClassScreen";
import { NavigationHeader } from "../components/navigation/NavigationHeader";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <NavigationHeader
              title={title}
              subtitle={options.subtitle}
              onBackPress={back ? navigation.goBack : undefined}
              onStarPress={() => {}}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="Job Class"
        component={JobClassScreen}
        options={{
          subtitle: "Find tasks that are relevant to you",
        }}
      />
    </Stack.Navigator>
  );
};
