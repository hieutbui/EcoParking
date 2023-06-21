import Mapbox, { UserLocationRenderMode } from '@rnmapbox/maps';
import { Header } from 'app/shared/components/Header';
import React, { useState } from 'react';
import { Image, Text, View, Platform } from 'react-native';
import { mapboxToken, styleURL } from '../../../env.json';
import { Const } from 'app/constants/Const';
import { useFocusEffect } from '@react-navigation/native';
import Assets from 'app/assets/Assets';

export const HomeScreen = () => {
  const zoom = 16;

  async function hasLocationPermission() {
    if (
      Const.os === 'ios' ||
      (Const.os === 'android' && Platform.Version < 23)
    ) {
      return true;
    }

    const isGranted = await Mapbox.requestAndroidLocationPermissions();
    return isGranted;
  }

  useFocusEffect(() => {
    const task = async () => {
      await hasLocationPermission();
    };

    task();
  });

  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView
        style={{ height: Const.deviceHeight, width: Const.deviceWidth }}
        styleURL={styleURL}
        logoEnabled={false}
        scaleBarEnabled={false}
        attributionEnabled={false}
      >
        <Mapbox.UserLocation
          androidRenderMode={'gps'}
          renderMode={Mapbox.UserLocationRenderMode.Normal}
        >
          <Mapbox.Images images={{ userLocation: Assets.AppIcons.icMapCar }} />
          <Mapbox.CircleLayer
            id={'outer_circle'}
            style={{
              circleColor: Assets.AppColors.feature,
              circleRadius: 80,
              circleOpacity: 0.08,
            }}
          />
          <Mapbox.CircleLayer
            id={'inner_circle'}
            style={{
              circleColor: Assets.AppColors.feature,
              circleRadius: 40,
              circleOpacity: 0.27,
            }}
          />
          <Mapbox.SymbolLayer
            id="CustomUserLocation"
            style={{
              iconImage: 'userLocation',
              iconRotationAlignment: 'map',
              iconAllowOverlap: true,
              iconSize: 2,
              iconHaloWidth: 50,
              iconHaloColor: 'red',
            }}
          />
        </Mapbox.UserLocation>
        <Mapbox.Camera
          zoomLevel={zoom}
          followUserLocation
          followUserMode={Mapbox.UserTrackingMode.Follow}
        />
      </Mapbox.MapView>
    </View>
  );
};
