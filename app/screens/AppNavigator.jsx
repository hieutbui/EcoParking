import React, { useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { ScreenNames } from 'app/constants/ScreenNames';
import { HomeScreen } from './home/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppIcons } from 'app/assets/AppIcon';
import { SavedScreen } from './saved/SavedScreen';
import { BookingScreen } from './booking/BookingScreen';
import { ProfileScreen } from './profile/ProfileScreen';
import { Image } from 'react-native';
import { Const } from 'app/constants/Const';
import { AppColors } from 'app/assets/AppColors';

enableScreens();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const rootNavigation = createNavigationContainerRef();

export const AppNavigator = () => {
  return (
    <NavigationContainer ref={rootNavigation}>
      <Stack.Navigator
        initialRouteName={ScreenNames.MainTabBar}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={ScreenNames.MainTabBar} component={MainTabBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function MainTabBar() {
  const tabBarIcons = {
    HOMENormal: AppIcons.icHomeInactive,
    HOMEFocused: AppIcons.icHomeActive,
    SAVEDNormal: AppIcons.icBookmarkInactive,
    SAVEDFocused: AppIcons.icBookmarkActive,
    BOOKINGNormal: AppIcons.icBookingInactive,
    BOOKINGFocused: AppIcons.icBookingActive,
    PROFILENormal: AppIcons.icProfileInactive,
    PROFILEFocused: AppIcons.icProfileActive,
  };

  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.Home}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const routeName = route.name;
          const state = focused ? 'Focused' : 'Normal';
          const icon = tabBarIcons[`${routeName}${state}`];
          return tabIcon(icon);
        },
        tabBarActiveTintColor: AppColors.feature,
        tabBarInactiveTintColor: AppColors.inactiveColor,
      })}
    >
      <Tab.Screen name={ScreenNames.Home} component={HomeScreen} />
      <Tab.Screen name={ScreenNames.Saved} component={SavedScreen} />
      <Tab.Screen name={ScreenNames.Booking} component={BookingScreen} />
      <Tab.Screen name={ScreenNames.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function tabIcon(icon) {
  return (
    <Image
      source={icon}
      style={{
        aspectRatio: 1,
        resizeMode: 'contain',
        marginTop: Const.os === 'android' ? Const.space_4 : Const.space_0,
      }}
    />
  );
}
