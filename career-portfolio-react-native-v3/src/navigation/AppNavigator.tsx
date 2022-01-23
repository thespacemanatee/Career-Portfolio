import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getHeaderTitle } from "@react-navigation/elements";

import { JobClassScreen } from "../screens/JobClassScreen";
import { NavigationHeader } from "../components/navigation/NavigationHeader";

import type { RootStackParamList } from ".";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Job Class"
        component={JobClassScreen}
        options={{
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <NavigationHeader
                title={title}
                subtitle="Find tasks that are relevant to you"
                onBackPress={back ? navigation.goBack : undefined}
                onStarPress={() => {}}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};
