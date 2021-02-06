import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";

import tasksReducer from "./src/store/reducers/task";
import verbsReducer from "./src/store/reducers/verbs";
import { RootNavigator } from "./src/navigation/AppNavigator";
import Colors from "./src/constants/Colors";

import * as data from "./src/data/career_data.json";
const dataArray = Object.values(data);

const rootReducer = combineReducers({
  tasks: tasksReducer,
  verbs: verbsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.accent,
  },
};

const getActionVerbsArray = () => {
  return new Promise((resolve, reject) => {
    const tempArray = [];
    dataArray.forEach((element) => {
      const { Task } = element;
      const actionVerb = (Task + "").split(/[ ,]+/, 1).toString();
      if (
        !tempArray.find((v) =>
          _.isEqual((v + "").split(/[ ,]+/, 1).toString(), actionVerb)
        )
      )
        tempArray.push(actionVerb);
    });
    tempArray.sort();
    resolve(tempArray);
  });
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [actionVerbs, setActionVerbs] = useState([]);

  if (!isLoaded) {
    return (
      <AppLoading
        startAsync={async () => {
          const tempArray = await getActionVerbsArray();
          setActionVerbs(tempArray);
        }}
        onFinish={() => {
          setIsLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <PaperProvider
        theme={theme}
        settings={{
          icon: (props) => <Ionicons {...props} />,
        }}
      >
        <NavigationContainer>
          <RootNavigator data={{ actionVerbs: actionVerbs }} />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
