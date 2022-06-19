import { render } from "@testing-library/react-native";
import { ThemeProvider } from "@shopify/restyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";

import { theme } from "../theme";

const client = new QueryClient();

const AllTheProviders = ({ children }) => {
  return (
    <QueryClientProvider {...{ client }}>
      <ThemeProvider {...{ theme }}>
        <NavigationContainer>{children}</NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react-native";

export { customRender as render };
