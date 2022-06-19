import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Animated, FlatList } from "react-native";
import Layout from "../../constants/Layout";
import { Box } from "../../theme";

import Card from "./Card";

interface PropertiesList {
  data: IProperty[];
  currentMarkerIndex: number;
  setCurrentMarkerIndex: Dispatch<SetStateAction<number>>;
}

export const ITEM_SIZE = Layout.window.width;

const PropertiesList = ({
  data,
  currentMarkerIndex,
  setCurrentMarkerIndex,
}: PropertiesList) => {
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewRef = React.useRef(({ viewableItems }) => {
    setCurrentMarkerIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });

  const keyExtractor = (_property: IProperty, index: number) => {
    return index.toString();
  };

  const renderItem = ({ item }: { item: IProperty; index: number }) => {
    return (
      <Box testID="propertiesList-item" width={ITEM_SIZE}>
        <Card
          id={item.id.toString()}
          image={item.images[0].url}
          title={item.name}
          description={item.street}
          price={
            item.lowest_price_per_month ||
            item.lowest_price_per_night ||
            item.id
          }
        />
      </Box>
    );
  };

  const memoizedRenderItem = useMemo(() => renderItem, [data]);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.floor(value / ITEM_SIZE);
      setCurrentMarkerIndex(index);
    });

    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (flatListRef.current && currentMarkerIndex) {
      flatListRef.current?.scrollToIndex({
        index: currentMarkerIndex,
        animated: false,
      });
    }
  }, [currentMarkerIndex]);

  return (
    <FlatList
      ref={flatListRef}
      renderItem={memoizedRenderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      snapToInterval={ITEM_SIZE}
      decelerationRate={0.9}
      scrollEventThrottle={16}
      snapToAlignment="start"
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
      onScrollToIndexFailed={() => {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: false,
        });
      }}
      renderToHardwareTextureAndroid
      {...{ data, keyExtractor }}
    />
  );
};

export default PropertiesList;
