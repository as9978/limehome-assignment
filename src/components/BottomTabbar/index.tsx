import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Box, Text, useTheme } from "../../theme";

const BottomTabbar = ({ state, descriptors, navigation }) => {
  const theme = useTheme();

  const innerState = state.routes[state.index].state;
  if (innerState && innerState.routes[innerState.index].name === "Details")
    return null;
  else {
    return (
      <Box
        position="absolute"
        bottom={0}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="primary"
        borderTopRightRadius="l"
        borderTopLeftRadius="l"
        paddingVertical="s"
        paddingHorizontal="xxl"
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          let iconName;

          if (label === "Search") {
            iconName = "search";
          } else if (label === "Map") {
            iconName = "map";
          } else if (label === "Saved") {
            iconName = "heart";
          } else if (label === "Profile") {
            iconName = "user";
          }

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isFocused
                  ? theme.colors.primaryVeryLight
                  : theme.colors.transparent,
                paddingVertical: theme.spacing.s,
                borderRadius: theme.borderRadii.s,
              }}
            >
              <Feather name={iconName} size={18} color="white" />
              <Text variant="caption" color="white" marginTop="xs">
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Box>
    );
  }
};

export default BottomTabbar;
