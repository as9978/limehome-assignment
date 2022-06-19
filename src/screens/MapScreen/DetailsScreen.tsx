import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { getPropertyById } from "../../api/properties";
import Carousel from "../../components/Map/Carousel";
import { Box, Text, useTheme } from "../../theme";
import Badge from "../../components/Map/Badge";
import Layout from "../../constants/Layout";

const DetailsScreen = ({ route }: MapNavigatorProps<"Details">) => {
  const theme = useTheme();

  const { id, image } = route.params;

  const navigation = useNavigation();

  const [footerHeight, setFooterHeight] = useState(48);

  const { data, status } = getPropertyById(id);

  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    backButton: {
      position: "absolute",
      top: insets.top + 8,
      left: 16,
      padding: theme.spacing.s,
      borderRadius: theme.borderRadii.s,
      backgroundColor: theme.colors.background,
    },
    exploreButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.m,
      paddingHorizontal: theme.spacing.l,
    },
  });

  return (
    <Box flex={1}>
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Carousel
          images={data?.payload.images}
          fallbackUrl={image}
          {...{ status }}
        />

        <Box
          flex={1}
          backgroundColor="background"
          style={{ paddingBottom: footerHeight }}
        >
          {status === "success" ? (
            <Box flex={1} paddingHorizontal="m" paddingVertical="l">
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text variant="title" numberOfLines={2}>
                  {data?.payload.name}
                </Text>

                <Box
                  flexDirection="row"
                  alignItems="center"
                  backgroundColor="background"
                  paddingVertical="xxs"
                  paddingHorizontal="s"
                  borderRadius="xs"
                  borderWidth={1}
                >
                  <Text variant="large" marginRight="s">
                    4.5
                  </Text>
                  <MaterialIcons
                    name="star"
                    size={20}
                    color={theme.colors.secondary}
                  />
                </Box>
              </Box>

              <Box flexDirection="row" alignItems="flex-start" marginTop="m">
                <Ionicons
                  name="md-location-outline"
                  size={24}
                  color={theme.colors.secondary}
                />
                <Text variant="medium">{data?.payload.street}</Text>
              </Box>

              <Text variant="medium" marginTop="l">
                {data?.payload.description}
              </Text>

              <Box
                width="100%"
                height={1}
                backgroundColor="accent"
                marginVertical="xl"
              />

              <Text variant="large">Room types available in this location</Text>

              <Box
                flexDirection="row"
                alignItems="center"
                flexWrap="wrap"
                marginTop="m"
              >
                {data?.payload.unit_groups[0].amenities.map(
                  (amenity, index) => (
                    <Badge key={index} title={amenity.name} />
                  )
                )}
              </Box>
            </Box>
          ) : (
            <Box
              flex={1}
              alignItems="center"
              justifyContent="center"
              paddingTop="6xl"
            >
              <ActivityIndicator size={72} color={theme.colors.primary} />
            </Box>
          )}
        </Box>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="close" size={20} color={theme.colors.accent} />
        </TouchableOpacity>
      </ScrollView>

      {status === "success" && (
        <Box
          position="absolute"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          bottom={0}
          width={Layout.window.width}
          backgroundColor="primaryLight"
          paddingHorizontal="m"
          paddingVertical="s"
          onLayout={(event) => setFooterHeight(event.nativeEvent.layout.height)}
        >
          <Box flex={1} flexDirection="row" alignItems="center">
            <Text variant="body" fontSize={16}>
              From{" "}
            </Text>
            <Text variant="body" fontSize={16} color="secondary">
              {data?.payload.id}€/Night
            </Text>
          </Box>

          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.goBack()}
          >
            <Text variant="medium" marginRight="xxs" color="white">
              EXPLORE
            </Text>
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color={theme.colors.white}
            />
          </TouchableOpacity>
        </Box>
      )}
    </Box>
  );
};

export default DetailsScreen;
