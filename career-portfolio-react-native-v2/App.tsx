/* eslint-disable global-require */
import React, { useState } from "react";
import { Platform, LogBox } from "react-native";
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

LogBox.ignoreLogs([
  "ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary.",
]);

export default function App() {
  const [ready, setReady] = useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      "Manrope-Bold": require("./assets/fonts/Manrope-Bold.ttf"),
      "Manrope-SemiBold": require("./assets/fonts/Manrope-SemiBold.ttf"),
      "Manrope-ExtraBold": require("./assets/fonts/Manrope-ExtraBold.ttf"),
      "Manrope-ExtraLight": require("./assets/fonts/Manrope-ExtraLight.ttf"),
      "Manrope-Light": require("./assets/fonts/Manrope-Light.ttf"),
      "Manrope-Medium": require("./assets/fonts/Manrope-Medium.ttf"),
      "Manrope-Regular": require("./assets/fonts/Manrope-Regular.ttf"),
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
