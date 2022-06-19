import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          ...FontAwesome.font,
          gilmer: require("../../assets/fonts/Gilmer-Regular.otf"),
          gilmerMedium: require("../../assets/fonts/Gilmer-Medium.otf"),
          milkman: require("../../assets/fonts/milkman.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;
