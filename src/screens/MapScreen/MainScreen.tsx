import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getProperties } from "../../api/properties";
import { CustomMarker, PropertiesList } from "../../components/Map";
import Layout from "../../constants/Layout";
import { Box, useTheme } from "../../theme";

const MapScreen = () => {
  const theme = useTheme();

  const insets = useSafeAreaInsets();

  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState({
    latitude: 52.520008,
    longitude: 13.404954,
    latitudeDelta: 0.3,
    longitudeDelta: 0.2,
  });
  const [currentMarkerIndex, setCurrentMarkerIndex] = useState(0);

  const tabBarHeight = useBottomTabBarHeight();

  const { data, status } = getProperties();

  const styles = StyleSheet.create({
    container: { paddingTop: insets.top, paddingBottom: insets.bottom },
    map: {
      width: Layout.window.width,
      height: Layout.window.height,
    },
    marker: {
      minWidth: 40,
      minHeight: 40,
    },
  });

  useEffect(() => {
    if (status === "success") {
      const { lat, lng } = data?.payload[currentMarkerIndex].location;
      mapRef.current?.animateToRegion(
        {
          ...region,
          latitude: lat,
          longitude: lng,
        },
        100
      );
    }
  }, [currentMarkerIndex]);

  return (
    <Box
      flex={1}
      alignItems="center"
      justifyContent="center"
      style={styles.container}
    >
      {status === "loading" && (
        <Box
          style={StyleSheet.absoluteFillObject}
          flex={1}
          alignItems="center"
          justifyContent="center"
          backgroundColor="loadingBackground"
          zIndex={2}
        >
          <ActivityIndicator size={72} color={theme.colors.primary} />
        </Box>
      )}

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChange={(newRegion) => setRegion(newRegion)}
        provider={PROVIDER_GOOGLE}
      >
        {status === "success" &&
          data?.payload.map((item, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: item.location.lat,
                longitude: item.location.lng,
              }}
              style={[
                styles.marker,
                { zIndex: currentMarkerIndex === index ? 10 : 1 },
              ]}
              onPress={() => {
                setCurrentMarkerIndex(index);
              }}
            >
              <CustomMarker
                price={
                  item.lowest_price_per_month ||
                  item.lowest_price_per_night ||
                  item.id
                }
                isSelected={currentMarkerIndex === index}
              />
            </Marker>
          ))}
      </MapView>
      {status === "success" && (
        <Box bottom={tabBarHeight + 32} position="absolute">
          <PropertiesList
            data={data?.payload}
            {...{ currentMarkerIndex, setCurrentMarkerIndex }}
          />
        </Box>
      )}
    </Box>
  );
};

export default MapScreen;
