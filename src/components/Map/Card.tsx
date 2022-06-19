import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Box, Text, useTheme } from "../../theme";

interface CardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

const Card = ({ id, image, title, description, price }: CardProps) => {
  const theme = useTheme();

  const [isImageLoading, setIsImageLoading] = useState(true);

  const navigation = useNavigation<StackNavigationProp<MapStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", {
          id,
          image,
        })
      }
    >
      <Box
        width="96%"
        alignSelf="center"
        flexDirection="row"
        backgroundColor="background"
        borderWidth={0.61}
        borderColor="primary"
      >
        <Box width="40%" height={150}>
          <Image
            testID="card-image"
            source={{
              uri: image,
            }}
            style={styles.image}
            onLoad={() => setIsImageLoading(false)}
          />

          <Box
            position="absolute"
            top={12}
            right={12}
            flexDirection="row"
            alignItems="center"
            backgroundColor="background"
            paddingVertical="xxs"
            paddingHorizontal="xs"
            borderRadius="xs"
          >
            <Text variant="body" fontSize={13} marginRight="xxs">
              4.5
            </Text>
            <MaterialIcons
              name="star"
              size={14}
              color={theme.colors.secondary}
            />
          </Box>

          {isImageLoading && (
            <Box
              style={StyleSheet.absoluteFillObject}
              alignItems="center"
              justifyContent="center"
            >
              <ActivityIndicator size={36} color={theme.colors.secondary} />
            </Box>
          )}
        </Box>
        <Box flex={1} flexDirection="column" padding="m">
          <Text testID="card-title" variant="title" numberOfLines={2}>
            {title}
          </Text>

          <Box
            flex={2}
            flexDirection="row"
            alignItems="flex-start"
            marginTop="m"
          >
            <Ionicons
              name="md-location-outline"
              size={18}
              color={theme.colors.secondary}
            />
            <Text testID="card-description" variant="body" numberOfLines={2}>
              {description}
            </Text>
          </Box>

          <Box
            width="100%"
            height={0.61}
            backgroundColor="accent"
            alignSelf="center"
            marginVertical="s"
          />

          <Box flex={1} flexDirection="row" alignItems="center">
            <Text variant="body">From </Text>
            <Text testID="card-price" variant="body" color="secondary">
              {price}€/Night
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});

export default Card;
