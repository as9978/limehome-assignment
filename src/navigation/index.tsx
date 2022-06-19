import { ColorSchemeName } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  SearchScreen,
  MapScreen,
  ProfileScreen,
  SavedScreen,
} from "../screens";
import BottomTabbar from "../components/BottomTabbar";
import { DetailsScreen } from "../screens/MapScreen";
import { createStackNavigator } from "@react-navigation/stack";

interface NavigationProps {
  colorScheme: ColorSchemeName;
}

const Navigation = ({}: NavigationProps) => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

const MapStack = createStackNavigator<MapStackParamList>();

const MapNavigator = () => {
  return (
    <MapStack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <MapStack.Screen name="Main" component={MapScreen} />
      <MapStack.Screen
        name="Details"
        component={DetailsScreen}
      />
    </MapStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Map"
      tabBar={(props) => <BottomTabbar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen name="Search" component={SearchScreen} />
      <BottomTab.Screen name="Map" component={MapNavigator} />
      <BottomTab.Screen name="Saved" component={SavedScreen} />
      <BottomTab.Screen name="Profile" component={ProfileScreen} />
    </BottomTab.Navigator>
  );
};

export default Navigation;
