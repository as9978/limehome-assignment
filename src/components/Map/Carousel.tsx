import React, { useRef, useState } from "react";
import { ActivityIndicator, Animated, Image, StyleSheet } from "react-native";

import Layout from "../../constants/Layout";
import { Box, useTheme } from "../../theme";
import Dot from "./Dot";

interface CarouselProps {
  status: "idle" | "error" | "loading" | "success";
  images: IImage[] | undefined;
  fallbackUrl: string;
}

const ITEM_SIZE = Layout.window.width;

const Carousel = ({ status, images, fallbackUrl }: CarouselProps) => {
  const theme = useTheme();

  const scrollX = useRef(new Animated.Value(0)).current;

  const [isImageLoading, setIsImageLoading] = useState({});

  return (
    <Box flex={1}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        snapToInterval={Layout.window.width}
        decelerationRate={0.9}
        scrollEventThrottle={16}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        style={{ maxHeight: 300 }}
      >
        {status === "success" ? (
          images?.map((item, index) => {
            const opacity = scrollX.interpolate({
              inputRange: [
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
                (index + 1) * ITEM_SIZE,
              ],
              outputRange: [0, 1, 0],
              extrapolate: "clamp",
            });

            const scale = scrollX.interpolate({
              inputRange: [
                (index - 1) * ITEM_SIZE,
                index * ITEM_SIZE,
                (index + 1) * ITEM_SIZE,
              ],
              outputRange: [0.61, 1, 0.61],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={{
                  width: ITEM_SIZE,
                  height: 300,
                  opacity,
                  transform: [{ scale }],
                }}
              >
                <Image
                  testID="carousel-image"
                  source={{
                    uri: item.url,
                  }}
                  style={styles.image}
                  onLoadStart={() => {
                    setIsImageLoading({
                      ...isImageLoading,
                      [index]: true,
                    });
                  }}
                  onLoad={() => {
                    setIsImageLoading({
                      ...isImageLoading,
                      [index]: false,
                    });
                  }}
                />

                {isImageLoading[index] && (
                  <Box
                    style={StyleSheet.absoluteFillObject}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <ActivityIndicator
                      size={36}
                      color={theme.colors.secondary}
                    />
                  </Box>
                )}
              </Animated.View>
            );
          })
        ) : (
          <Box width={ITEM_SIZE} height={300}>
            <Image
              testID="carousel-fallback-image"
              source={{
                uri: fallbackUrl,
              }}
              style={styles.image}
            />
          </Box>
        )}
      </Animated.ScrollView>

      {images && (
        <Box
          position="absolute"
          bottom={16}
          left={Layout.window.width / 2 - (images?.length / 2) * 16}
          flexDirection="row"
          alignItems="center"
          backgroundColor="loadingBackground"
          paddingVertical="xs"
          paddingHorizontal="xxs"
          borderRadius="m"
        >
          {images?.map((_image, index) => (
            <Dot
              key={index}
              currentIndex={Animated.divide(scrollX, ITEM_SIZE)}
              {...{ index }}
            />
          ))}
        </Box>
      )}
    </Box>
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

export default Carousel;
