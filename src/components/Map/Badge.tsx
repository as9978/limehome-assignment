import React from "react";

import { Box, Text } from "../../theme";

interface BadgeProps {
  title: string;
}

const Badge = ({ title }: BadgeProps) => {
  return (
    <Box
      paddingVertical="m"
      paddingHorizontal="s"
      backgroundColor="primaryLight"
      borderRadius="xs"
      marginRight="m"
      marginBottom="m"
    >
      <Text variant="medium" fontSize={16}>{title}</Text>
    </Box>
  );
};

export default Badge;
