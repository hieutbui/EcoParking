import Mapbox from '@rnmapbox/maps';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Text,
  View,
  Platform,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { mapboxToken, styleURL } from '../../../env.json';
import { Const } from 'app/constants/Const';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
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
import { BottomUpRef } from 'app/shared/components/BottomUp';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import { CustomMap } from 'app/shared/components/CustomMap';
import { Header } from 'app/shared/components/Header';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { thunkGetBooking } from 'app/controllers/slice/account.slice';

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
  const dispatch = useDispatch();
  const { parks } = useAppSelector(state => state.parking);
  /**
   * @type {React.Ref<Mapbox.Camera>}
   */
  const camera = useRef(null);
  const [followUser, setFollowUser] = useState(true);
  const { t } = useTranslation();
  const [direction, setDirection] = useState(null);

  const [showDirection, setShowDirection] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const bottomSheetDirectionRef = useRef(null);

  const navigation = useNavigation();

  const [showMap, setShowMap] = useState(false);

  const isFocused = useIsFocused();

  const { userInfo } = useAppSelector(state => state.account);

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
      bottomSheetModalRef.current.present();
      camera.current?.setCamera({
        centerCoordinate: [
          parseFloat(selectedPark.longitude.$numberDecimal),
          parseFloat(selectedPark.latitude.$numberDecimal),
        ],
        zoomLevel: zoom,
        bounds: {
          paddingBottom: 350,
        },
      });
    }
    if (!isFocused) {
      setFollowUser(true);
      bottomSheetModalRef.current.dismiss();
    }
  }, [followUser, selectedPark, isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: Assets.AppColors.white }}>
      {/* Park info */}
      {/* <BottomSheet
        refBottomSheet={bottomSheetModalRef}
        enableSwipeToDismiss
        hideOnBackdropPress
        onClose={() => {
          if (!showDirection) {
            setFollowUser(true);
          }
        }}
        content={

        }
      /> */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['52%']}
        handleIndicatorStyle={{
          width: 55,
          height: Const.space_3,
          backgroundColor: Assets.AppColors.lightgrey,
          zIndex: 1,
        }}
        backgroundStyle={{
          borderTopRightRadius: Const.space_50,
          borderTopLeftRadius: Const.space_50,
        }}
        onDismiss={() => {
          if (!showDirection) {
            setSelectedPark(null);
            setFollowUser(true);
          }
        }}
      >
        <View
          style={{
            backgroundColor: Assets.AppColors.white,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingHorizontal: Const.space_31,
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
              onPress={() => {
                setShowDirection(true);
                camera.current?.fitBounds(
                  [userLocate.coords.longitude, userLocate.coords.latitude],
                  [
                    selectedPark.longitude.$numberDecimal,
                    selectedPark.latitude.$numberDecimal,
                  ],
                  [100, 62, Const.deviceHeight / 2 + 50, 62],
                  1000,
                );
                bottomSheetModalRef.current.dismiss();

                // NavigatorUtils.gotoDirection(
                //   { direction, selectedPark },
                //   navigation,
                // );
                bottomSheetDirectionRef.current.present();
              }}
              style={{
                width: (Const.deviceWidth - 60) / 2 - Const.space_20,
              }}
            />
            <RadiusButton
              title={t('Details')}
              type="positive"
              onPress={() => {
                bottomSheetModalRef.current.dismiss();
                NavigatorUtils.gotoParkingDetail(
                  {
                    parkingInfo: selectedPark,
                    duration: utils.secondsToHms(direction?.routes[0].duration),
                    distance: utils.metersToKM(direction?.routes[0].distance),
                  },
                  navigation,
                );
              }}
              style={{
                width: (Const.deviceWidth - 60) / 2 - Const.space_20,
              }}
              rightIcon={Assets.AppIcons.icArrowRight}
            />
          </View>
        </View>
      </BottomSheetModal>
      {/* Direction */}
      {/* <BottomSheet
        refBottomSheet={bottomSheetDirectionRef}
        enableSwipeToDismiss
        hideOnBackdropPress
        onClose={() => {
          setShowDirection(false);
          setDirection(null);
          setFollowUser(true);
        }}
        content={

        }
      /> */}
      <BottomSheetModal
        ref={bottomSheetDirectionRef}
        snapPoints={['35%']}
        handleIndicatorStyle={{
          width: 55,
          height: Const.space_3,
          backgroundColor: Assets.AppColors.lightgrey,
        }}
        backgroundStyle={{
          borderTopRightRadius: Const.space_50,
          borderTopLeftRadius: Const.space_50,
        }}
        onDismiss={() => {
          setDirection(null);
          setShowDirection(false);
          setSelectedPark(null);
        }}
      >
        <View
          style={{
            backgroundColor: Assets.AppColors.white,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingHorizontal: Const.space_31,
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
              {t('Direction')}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: Font.bold,
              fontSize: FontSize.s_24,
              fontStyle: 'normal',
              lineHeight: Const.space_35,
              fontWeight: '600',
              color: Assets.AppColors.black,
              alignSelf: 'flex-start',
            }}
          >
            {utils.metersToKM(direction?.routes[0].distance)}
          </Text>
          <Text
            style={{
              fontFamily: Font.semiBold,
              fontSize: FontSize.s_20,
              fontStyle: 'normal',
              lineHeight: Const.space_31,
              fontWeight: '600',
              color: Assets.AppColors.black,
              alignSelf: 'flex-start',
            }}
          >
            {utils.secondsToHms(direction?.routes[0].duration)}
          </Text>
          <Text
            style={{
              fontSize: FontSize.s_15,
              lineHeight: Const.space_26,
              color: Assets.AppColors.starDust,
              fontStyle: 'normal',
              fontWeight: '500',
              fontFamily: Font.medium,
              alignSelf: 'flex-start',
              marginBottom: Const.space_10,
            }}
          >
            {t('Your location') + ' -----> ' + selectedPark?.name}
          </Text>
          <RadiusButton
            title={t('Close')}
            type="hollow"
            onPress={() => {
              bottomSheetDirectionRef.current.dismiss();
            }}
            style={{
              marginBottom: Const.space_10,
            }}
          />
        </View>
      </BottomSheetModal>
      <Header title="Home" />
      <View>
        <CustomMap
          onFinishLoad={() => {
            dispatch(thunkGetAllParks());
            dispatch(thunkGetBooking({ userId: userInfo._id }));
          }}
          content={
            <>
              <Mapbox.UserLocation
                androidRenderMode={'gps'}
                renderMode={Mapbox.UserLocationRenderMode.Normal}
                onUpdate={location => {
                  setUserLocate(location);
                }}
              >
                <Mapbox.Images
                  images={{ userLocation: Assets.AppIcons.icMapCar }}
                />
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
                        onPress={async () => {
                          setSelectedPark(park);
                          setFollowUser(false);
                          utils.showLoading({ message: t('Loading') + '...' });
                          try {
                            const result = await api.park.getDirection({
                              startLongitude: userLocate.coords.longitude,
                              startLatitude: userLocate.coords.latitude,
                              endLongitude: park.longitude.$numberDecimal,
                              endLatitude: park.latitude.$numberDecimal,
                            });
                            setDirection(result);
                            // bottomSheetModalRef.current.present();
                            utils.hideLoading();
                          } catch (error) {
                            console.log({ error });
                            bottomSheetModalRef.current.dismiss();
                            utils.hideLoading();
                            utils.toast({ message: t('Cannot get direction') });
                          }
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
              {!_.isEmpty(direction) && showDirection ? (
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
            </>
          }
        />
      </View>
    </View>
  );
};
