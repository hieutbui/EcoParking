import React, { useEffect, useRef, createRef } from 'react';
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
import { UpdateProfileScreen } from './profile/UpdateProfileScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ParkingDetailScreen } from './details/ParkingDetailScreen';
import { NotificationSettingsScreen } from './profile/NotificationSettingsScreen';
import { SecurityScreen } from './profile/SecurityScreen';
import { BookParkingDetailScreen } from './details/BookParkingDetailScreen';
import { PaymentScreen } from './profile/PaymentScreen';
import { ReviewSummaryScreen } from './tickets/ReviewSummaryScreen';
import { ParkingTicketScreen } from './tickets/ParkingTicketScreen';
import { SelectVehicleScreen } from './tickets/SelectVehicleScreen';
import { DirectionScreen } from './direction/DirectionScreen';
import { RouteNavigationScreen } from './direction/RouteNavigationScreen';
import { ParkingTimerScreen } from './tickets/ParkingTImerScreen';
import { CancelParking } from './tickets/CancelParkingScreen';
import { store } from 'app/controllers/redux/AppStore';
import { thunkGetSavedParkings } from 'app/controllers/slice/parking.slice';
import { thunkGetBooking } from 'app/controllers/slice/account.slice';

enableScreens();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const rootNavigation = createNavigationContainerRef();
const routeNameRef = createRef();

/**
 * @author hieubt
 * @returns {JSX.Element}
 */
export const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer
          ref={rootNavigation}
          onReady={() => {
            routeNameRef.current =
              rootNavigation.current.getCurrentRoute().name;
          }}
        >
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
            <Stack.Screen
              name={ScreenNames.MainTabBar}
              component={MainTabBar}
            />
            {/* FUNCTIONAL */}
            <Stack.Group>
              <Stack.Screen
                name={ScreenNames.UpdateProfile}
                component={UpdateProfileScreen}
              />
              <Stack.Screen
                name={ScreenNames.ParkingDetail}
                component={ParkingDetailScreen}
              />
              <Stack.Screen
                name={ScreenNames.NotificationSettings}
                component={NotificationSettingsScreen}
              />
              <Stack.Screen
                name={ScreenNames.Security}
                component={SecurityScreen}
              />
              <Stack.Screen
                name={ScreenNames.BookParking}
                component={BookParkingDetailScreen}
              />
              <Stack.Screen
                name={ScreenNames.Payment}
                component={PaymentScreen}
              />
              <Stack.Screen
                name={ScreenNames.ReviewSummary}
                component={ReviewSummaryScreen}
              />
              <Stack.Screen
                name={ScreenNames.ParkingTicket}
                component={ParkingTicketScreen}
              />
              <Stack.Screen
                name={ScreenNames.SelectVehicle}
                component={SelectVehicleScreen}
              />
              <Stack.Screen
                name={ScreenNames.Direction}
                component={DirectionScreen}
              />
              <Stack.Screen
                name={ScreenNames.RouteNavigation}
                component={RouteNavigationScreen}
              />
              <Stack.Screen
                name={ScreenNames.ParkingTimer}
                component={ParkingTimerScreen}
              />
              <Stack.Screen
                name={ScreenNames.CancelParking}
                component={CancelParking}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
      // detachInactiveScreens={false}
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
        listeners={({ navigation }) => ({
          tabPress: event => {
            store.dispatch(
              thunkGetSavedParkings({
                userId: store.getState().account.userInfo._id,
              }),
            );
          },
        })}
      />
      <Tab.Screen
        name={ScreenNames.Booking}
        component={BookingScreen}
        options={{ tabBarLabel: t(ScreenNames.Booking) }}
        listeners={({ navigation }) => ({
          tabPress: event => {
            store.dispatch(
              thunkGetBooking({
                userId: store.getState().account.userInfo._id,
              }),
            );
          },
        })}
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
