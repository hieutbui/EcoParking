import React, {useEffect, useRef} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import { ScreenNames } from 'app/shared/ScreenNames';
import { HomeScreen } from './home/HomeScreen';

enableScreens();
const Stack = createStackNavigator();
export const rootNavigation = createNavigationContainerRef();

export const AppNavigator = () => {
    return(
        <NavigationContainer
            ref={rootNavigation}
        >
            <Stack.Navigator
                initialRouteName={ScreenNames.Home}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name={ScreenNames.Home}
                    component={HomeScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}