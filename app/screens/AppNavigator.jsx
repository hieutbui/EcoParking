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
import { AppIcons } from 'app/assets/AppIcons';
import { SavedScreen } from './saved/SavedScreen';
import { BookingScreen } from './booking/BookingScreen';
import { ProfileScreen } from './profile/ProfileScreen';
import { Image } from 'react-native';
import { Const } from 'app/constants/Const';
import { AppColors } from 'app/assets/AppColors';
import { Font, FontSize, TextStyles } from 'app/constants/Styles';
import { useTranslation } from 'react-i18next';
import { LoginScreen } from './auth/LoginScreen';
import { RegisterScreen } from './auth/RegisterScreen';

enableScreens();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const rootNavigation = createNavigationContainerRef();

/**
 * @author hieubt
 * @returns {JSX.Element}
 */
export const AppNavigator = () => {
  return (
    <NavigationContainer ref={rootNavigation}>
      <Stack.Navigator
        initialRouteName={ScreenNames.Login}
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* AUTH */}
        <Stack.Group>
          <Stack.Screen name={ScreenNames.Login} component={LoginScreen} />
          <Stack.Screen
            name={ScreenNames.Register}
            component={RegisterScreen}
          />
        </Stack.Group>
        {/* TAB BAR */}
        <Stack.Screen name={ScreenNames.MainTabBar} component={MainTabBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function MainTabBar() {
  const { t } = useTranslation();
  const tabBarIcons = {
    HomeNormal: AppIcons.icHomeInactive,
    HomeFocused: AppIcons.icHomeActive,
    SavedNormal: AppIcons.icBookmarkInactive,
    SavedFocused: AppIcons.icBookmarkActive,
    BookingNormal: AppIcons.icBookingInactive,
    BookingFocused: AppIcons.icBookingActive,
    ProfileNormal: AppIcons.icProfileInactive,
    ProfileFocused: AppIcons.icProfileActive,
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
        tabBarStyle: {
          backgroundColor: AppColors.white,
          elevation: 0,
          borderTopColor: AppColors.white,
          zIndex: 1,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: Font.medium,
          fontStyle: 'normal',
          fontSize: FontSize.s_10,
          lineHeight: Const.space_14,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name={ScreenNames.Home}
        component={HomeScreen}
        options={{ tabBarLabel: t(ScreenNames.Home) }}
      />
      <Tab.Screen
        name={ScreenNames.Saved}
        component={SavedScreen}
        options={{ tabBarLabel: t(ScreenNames.Saved) }}
      />
      <Tab.Screen
        name={ScreenNames.Booking}
        component={BookingScreen}
        options={{ tabBarLabel: t(ScreenNames.Booking) }}
      />
      <Tab.Screen
        name={ScreenNames.Profile}
        component={ProfileScreen}
        options={{ tabBarLabel: t(ScreenNames.Profile) }}
      />
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
