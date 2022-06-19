type BottomTabParamList = {
  Search: undefined;
  Map: undefined;
  Saved: undefined;
  Profile: undefined;
};

type MapStackParamList = {
  Main: undefined;
  Details: {
    id: string;
    image: string;
  };
};

type MapNavigatorProps<RouteName extends keyof MapStackParamList> = {
  navigation: StackNavigationProp<MapStackParamList, RouteName>;
  route: RouteProp<MapStackParamList, RouteName>;
};
