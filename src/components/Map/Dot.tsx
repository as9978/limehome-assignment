import React from "react";
import { Animated } from "react-native";

interface DotProps {
  index: number;
  currentIndex: Animated.AnimatedDivision;
}

const Dot = ({ index, currentIndex }: DotProps) => {
  const opacity = currentIndex.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: "clamp",
  });

  const scale = currentIndex.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={{
        opacity,
        backgroundColor: "white",
        height: 8,
        width: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        transform: [{ scale }],
      }}
    />
  );
};

export default Dot;
