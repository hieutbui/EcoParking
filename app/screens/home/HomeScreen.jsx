import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenNames } from 'app/constants/ScreenNames';
import React from 'react';
import { MapScreen } from '../map/MapScreen';
import { NearbyScreen } from '../nearby/NearbyScreen';
import { HistoryScreen } from '../history/HistoryScreen';
import { ProfileScreen } from '../profile/ProfileScreen';
import { AppIcons } from 'app/assets/AppIcon';
import { Image, View } from 'react-native';
import { Const } from 'app/constants/Const';

const Tab = createBottomTabNavigator();

export const HomeScreen = () => {
  const tabBarIcons = {
    NEARBYNormal: AppIcons.icNearbyInactive,
    NEARBYFocused: AppIcons.icNearbyActive,
    MAPNormal: AppIcons.icMapInactive,
    MAPFocused: AppIcons.icMapActive,
    HISTORYNormal: AppIcons.icHistoryInactive,
    HISTORYFocused: AppIcons.icHistoryActive,
    PROFILENormal: AppIcons.icProfileInactive,
    PROFILEFocused: AppIcons.icProfileInactive,
  };

  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.Nearby}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const routeName = route.name;
          const state = focused ? 'Focused' : 'Normal';
          const icon = tabBarIcons[`${routeName}${state}`];
          return tabIcon(icon);
        },
      })}
    >
      <Tab.Screen name={ScreenNames.Nearby} component={NearbyScreen} />
      <Tab.Screen name={ScreenNames.Map} component={MapScreen} />
      <Tab.Screen name={ScreenNames.History} component={HistoryScreen} />
      <Tab.Screen name={ScreenNames.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

function tabIcon(icon) {
  return (
    <Image
      source={icon}
      style={{
        aspectRatio: 1,
        resizeMode: 'contain',
        marginTop: Const.os === 'android' ? 4 : 0,
      }}
    />
  );
}
