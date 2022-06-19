import React from "react";

import { Box, Text } from "../../theme";

interface CustomMarkerProps {
  price: number;
  isSelected: boolean;
}

const CustomMarker = ({ price, isSelected }: CustomMarkerProps) => {
  return (
    <Box
      testID="custom-marker-container"
      padding="s"
      backgroundColor={isSelected ? "secondary" : "accent"}
      borderRadius={isSelected ? "m" : "none"}
    >
      <Text
        testID="custom-marker-price"
        variant="caption"
        color="white"
        fontSize={13}
      >
        {price}€
      </Text>
      <Box
        position="absolute"
        bottom={-8}
        left="60%"
        width={0}
        height={0}
        backgroundColor="transparent"
        borderStyle="solid"
        borderLeftWidth={5}
        borderRightWidth={5}
        borderBottomWidth={10}
        borderLeftColor="transparent"
        borderRightColor="transparent"
        borderBottomColor={isSelected ? "secondary" : "accent"}
        style={{
          transform: [{ rotate: "180deg" }],
        }}
      />
    </Box>
  );
};

export default CustomMarker;
