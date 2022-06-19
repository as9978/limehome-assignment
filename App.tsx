import { useColorScheme } from "react-native";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";

import { darkTheme, theme } from "./src/theme";
import Navigation from "./src/navigation";
import useCachedResources from "./src/hooks/useCachedResources";

const client = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider {...{ client }}>
        <ThemeProvider theme={colorScheme === "light" ? theme : darkTheme}>
          <SafeAreaProvider>
            <Navigation {...{ colorScheme }} />
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }
}
