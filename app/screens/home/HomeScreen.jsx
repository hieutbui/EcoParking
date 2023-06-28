import Mapbox, { UserLocationRenderMode } from '@rnmapbox/maps';
import { Header } from 'app/shared/components/Header';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, View, Platform, ImageBackground } from 'react-native';
import { mapboxToken, styleURL } from '../../../env.json';
import { Const } from 'app/constants/Const';
import { useFocusEffect } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Font, FontSize } from 'app/constants/Styles';
import { BottomSheet } from 'app/shared/components/BottomSheet';
import { useDispatch } from 'react-redux';
import { thunkGetAllParks } from 'app/controllers/slice/parking.slice';
import utils, { useAppSelector } from 'app/shared/utils';
import _ from 'lodash';
import { ParkingInfo } from 'app/types';
import { useTranslation } from 'react-i18next';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import api from 'app/controllers/api';

Mapbox.setAccessToken(mapboxToken);

export const HomeScreen = () => {
  const zoom = 16;
  /**
   * @type {[Mapbox.Location, React.SetStateAction<Mapbox.Location>]}
   */
  const [userLocate, setUserLocate] = useState(null);
  /**
   * @type {[ParkingInfo, React.SetStateAction<ParkingInfo>]}
   */
  const [selectedPark, setSelectedPark] = useState(null);
  const refBottomSheetParkingInfo = useRef('park');
  const dispatch = useDispatch();
  const { parks } = useAppSelector(state => state.parking);
  /**
   * @type {React.Ref<Mapbox.Camera>}
   */
  const camera = useRef(null);
  const [followUser, setFollowUser] = useState(true);
  const { t } = useTranslation();
  const [direction, setDirection] = useState(null);

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

  useEffect(() => {
    if (!followUser && selectedPark) {
      camera.current?.setCamera({
        centerCoordinate: [
          parseFloat(selectedPark.longitude.$numberDecimal),
          parseFloat(selectedPark.latitude.$numberDecimal),
        ],
        zoomLevel: zoom,
      });
    }
  }, [followUser, selectedPark]);

  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView
        style={{ height: Const.deviceHeight, width: Const.deviceWidth }}
        styleURL={styleURL}
        logoEnabled={false}
        scaleBarEnabled={false}
        attributionEnabled={false}
        onDidFinishLoadingMap={() => {
          dispatch(thunkGetAllParks());
        }}
      >
        {/* User marker */}
        <Mapbox.UserLocation
          androidRenderMode={'gps'}
          renderMode={Mapbox.UserLocationRenderMode.Normal}
          onUpdate={location => {
            setUserLocate(location);
          }}
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
            }}
          />
        </Mapbox.UserLocation>
        {/* Parking markers */}
        {!_.isEmpty(parks)
          ? parks.map((park, index) => {
              return (
                <Mapbox.ShapeSource
                  key={park.name.toString() + index.toString()}
                  id={park.name.toString() + index.toString()}
                  shape={{
                    type: 'Feature',
                    properties: {
                      id: 'asd',
                    },
                    geometry: {
                      type: 'Point',
                      coordinates: [
                        parseFloat(park.longitude.$numberDecimal),
                        parseFloat(park.latitude.$numberDecimal),
                      ],
                    },
                  }}
                  onPress={() => {
                    setSelectedPark(park);
                    setFollowUser(false);
                    refBottomSheetParkingInfo.current.show();
                  }}
                >
                  <Mapbox.Images
                    images={{ markerIcon: Assets.AppIcons.icMapParking }}
                  />
                  <Mapbox.SymbolLayer
                    id={park.name.toString() + 'marker'}
                    sourceID={park.name.toString() + index.toString()}
                    style={{
                      iconImage: 'markerIcon',
                      iconSize: 4,
                      iconAllowOverlap: true,
                      textField:
                        !_.isEmpty(selectedPark) &&
                        selectedPark.name.toString() + 'marker' ===
                          park.name.toString() + 'marker'
                          ? park.name.toString()
                          : undefined,
                      textOffset: [0, -2],
                      textColor: '#E55D4C',
                    }}
                  />
                </Mapbox.ShapeSource>
              );
            })
          : null}
        {/* Route */}
        {!_.isEmpty(direction) ? (
          <Mapbox.ShapeSource
            id="DirectionShapeSource"
            shape={direction.routes[0].geometry}
          >
            <Mapbox.LineLayer
              id="routeFill"
              style={{
                lineColor: '#BC0063',
                lineWidth: 13,
                lineCap: Mapbox.LineJoin.Round,
                lineOpacity: 0.4,
              }}
            />
          </Mapbox.ShapeSource>
        ) : null}
        {/* camera config */}
        <Mapbox.Camera
          ref={camera}
          zoomLevel={zoom}
          followUserLocation={followUser}
          followUserMode={Mapbox.UserTrackingMode.Follow}
          allowUpdates
        />
      </Mapbox.MapView>
      {/* Park info */}
      <BottomSheet
        refBottomSheet={refBottomSheetParkingInfo}
        enableSwipeToDismiss
        hideOnBackdropPress
        onHideDone={() => {
          setSelectedPark(null);
          setFollowUser(true);
        }}
        backgroundOpacity={0}
        content={
          <View
            style={{
              backgroundColor: Assets.AppColors.white,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              borderTopRightRadius: Const.space_50,
              borderTopLeftRadius: Const.space_50,
              paddingHorizontal: Const.space_30,
            }}
          >
            <View
              style={{
                borderBottomWidth: Const.space_1,
                borderColor: Assets.AppColors.lightgrey,
                width: '100%',
                alignItems: 'center',
                marginBottom: Const.space_12,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.bold,
                  fontSize: FontSize.s_24,
                  fontStyle: 'normal',
                  lineHeight: Const.space_35,
                  fontWeight: '600',
                  color: Assets.AppColors.black,
                  paddingTop: Const.space_16,
                  paddingBottom: Const.space_13,
                }}
              >
                {t('Details')}
              </Text>
            </View>
            <Image
              source={{ uri: selectedPark?.image }}
              style={{
                borderRadius: Const.space_20,
                overflow: 'hidden',
                width: Const.deviceWidth - 60,
                height: 176,
                marginBottom: Const.space_10,
              }}
            />
            <View
              style={{
                alignSelf: 'flex-start',
                width: '100%',
                paddingBottom: Const.space_5,
                borderBottomWidth: Const.space_1,
                borderColor: Assets.AppColors.lightgrey,
                marginBottom: Const.space_10,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.semiBold,
                  fontSize: FontSize.s_20,
                  color: Assets.AppColors.black,
                  fontWeight: '600',
                }}
              >
                {selectedPark?.name}
              </Text>
              <Text
                style={{
                  color: Assets.AppColors.starDust,
                  fontWeight: '500',
                  fontSize: FontSize.s_15,
                  fontFamily: Font.medium,
                }}
              >
                {selectedPark?.address}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginBottom: Const.space_10,
              }}
            >
              <RadiusButton
                title={t('Get direction')}
                type="hollow"
                onPress={async () => {
                  utils.showLoading({ message: t('Loading') + '...' });
                  try {
                    const result = await api.park.getDirection({
                      startLongitude: userLocate.coords.longitude,
                      startLatitude: userLocate.coords.latitude,
                      endLongitude: selectedPark.longitude.$numberDecimal,
                      endLatitude: selectedPark.latitude.$numberDecimal,
                    });
                    setDirection(result);
                    camera.current?.fitBounds(
                      [userLocate.coords.longitude, userLocate.coords.latitude],
                      [
                        selectedPark.longitude.$numberDecimal,
                        selectedPark.latitude.$numberDecimal,
                      ],
                      [30, 30],
                      1000,
                    );
                    refBottomSheetParkingInfo.current.hide();
                    utils.hideLoading();
                  } catch (error) {
                    utils.hideLoading();
                    utils.toast({ message: t('Cannot get direction') });
                  }
                }}
                style={{
                  width: (Const.deviceWidth - 60) / 2 - Const.space_20,
                }}
              />
              <RadiusButton
                title={t('Details')}
                type="positive"
                onPress={() => {}}
                style={{
                  width: (Const.deviceWidth - 60) / 2 - Const.space_20,
                }}
                rightIcon={Assets.AppIcons.icArrowRight}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};
