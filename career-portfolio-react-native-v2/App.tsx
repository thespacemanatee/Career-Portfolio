import React, { useState } from "react";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as eva from "@eva-design/eva";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ApplicationProvider,
  IconRegistry,
  StyleService,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/app/store";
import { setVerbs, setOccupations } from "./src/app/features/local/localSlice";
import AppNavigator from "./src/navigation/AppNavigator";
import { getActionVerbsArray, getOccupationsArray } from "./src/helpers/utils";

export default function App() {
  const [ready, setReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      // eslint-disable-next-line global-require
      "SFProDisplay-Regular": require("./assets/fonts/SFProDisplay-Regular.ttf"),

      // eslint-disable-next-line global-require
      "SFProDisplay-Bold": require("./assets/fonts/SFProDisplay-Bold.ttf"),
    });
  };

  const loadAppAssets = async () => {
    await loadFonts();
    const verbs = await getActionVerbsArray();
    const occupations = await getOccupationsArray();
    store.dispatch(setVerbs(verbs));
    store.dispatch(setOccupations(occupations));
  };

  if (!ready) {
    return (
      <AppLoading
        startAsync={loadAppAssets}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationProvider {...eva} theme={eva.light}>
            {Platform.OS === "ios" && <StatusBar style="dark" />}
            <SafeAreaProvider style={styles.screen}>
              <AppNavigator />
            </SafeAreaProvider>
          </ApplicationProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

const styles = StyleService.create({
  screen: {
    flex: 1,
  },
});
