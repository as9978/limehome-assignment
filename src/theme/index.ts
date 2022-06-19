import { TextStyle, ViewStyle, ImageStyle } from "react-native";
import {
  createText,
  createBox,
  useTheme as useReTheme,
  createTheme,
} from "@shopify/restyle";
import { colors } from "./colors";
import { spacing } from "./spacing";
import { borderRadii } from "./bordeRadii";
import { textVariants } from "./textVariants";

export const theme = createTheme({
  breakpoints: {},
  colors: colors.light,
  spacing,
  borderRadii,
  textVariants,
});

export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
  colors: colors.dark,
};

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export const useTheme = () => useReTheme<Theme>();

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const currentTheme = useTheme();
    return styles(currentTheme);
  };
