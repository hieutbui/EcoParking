import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize, SecondFont } from 'app/constants/Styles';
import api from 'app/controllers/api';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import { ParkingInfo } from 'app/types';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import { BottomSheet } from 'app/shared/components/BottomSheet';

const OngoingRoute = () => {
  return (
    <View style={styles.tabContainer}>
      <ParkingCard
        type="paid"
        parking={{
          _id: '3298573209jr',
          unitPrice: '235y29',
          name: 'Bãi giữ xe đình Kim Liên',
          address: '152 P. Xã Đàn, Phương Liên, Đống Đa, Hà Nội, Việt Nam',
          quantity: 20,
          image: Assets.AppImages.image_defaultParking,
          longitude: {
            $numberDecimal: 105.83830152330626,
          },
          latitude: {
            $numberDecimal: 21.01062391357886,
          },
          available: 2,
          parkType: 0,
          createdAt: new Date('2023-07-05T17:07:01.920+00:00'),
          updatedAt: new Date('2023-07-05T17:07:01.920+00:00'),
          __v: 0,
        }}
      />
    </View>
  );
};

const CompleteRoute = () => {
  return <View style={styles.tabContainer} />;
};

const CanceledRoute = () => {
  return <View style={styles.tabContainer} />;
};

const renderScene = SceneMap({
  Ongoing: OngoingRoute,
  Completed: CompleteRoute,
  Canceled: CanceledRoute,
});

export const BookingScreen = () => {
  const { t } = useTranslation();

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'Ongoing', title: 'Ongoing' },
    { key: 'Completed', title: 'Completed' },
    { key: 'Canceled', title: 'Canceled' },
  ]);

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        pressColor={'transparent'}
        indicatorStyle={{
          height: Const.space_0,
        }}
        tabStyle={{
          width: 'auto',
          padding: 0,
        }}
        style={{
          backgroundColor: Assets.AppColors.white,
          shadowOpacity: 0,
          elevation: 0,
          paddingHorizontal: Const.space_28,
          paddingBottom: Const.space_20,
        }}
        gap={Const.space_18}
        scrollEnabled
        bounces
        renderLabel={({ route, focused, color }) => {
          return (
            <View
              style={{
                backgroundColor: !focused
                  ? 'transparent'
                  : Assets.AppColors.feature,
                borderRadius: Const.space_50,
                borderWidth: Const.space_2,
                borderColor: Assets.AppColors.feature,
                paddingHorizontal: Const.space_15,
                paddingVertical: Const.space_7,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.semiBold,
                  fontSize: FontSize.s_16,
                  color: !focused
                    ? Assets.AppColors.feature
                    : Assets.AppColors.white,
                }}
              >
                {route.title}
              </Text>
            </View>
          );
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={t('My Parking')}
        style={{ paddingBottom: Const.space_28 }}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Const.deviceWidth }}
        renderTabBar={renderTabBar}
        swipeEnabled={false}
      />
    </View>
  );
};

/**
 * @author hieubt
 * @typedef ParkingCardParams
 * @property {'active' | 'paid' | 'completed' | 'canceled'} type
 * @property {ParkingInfo} parking
 * @param {ParkingCardParams} props
 * @returns {JSX.Element}
 */
const ParkingCard = props => {
  const { t } = useTranslation();
  const { type, parking } = props;
  const bottomSheetCancelRef = useRef(null);
  let cardTag;
  /**
   * @type {StyleProp<ViewStyle>}
   */
  let cardWrapperStyle = {
    paddingHorizontal: Const.space_8,
    paddingVertical: Const.space_4,
    backgroundColor: 'transparent',
    borderRadius: Const.space_8,
    borderWidth: Const.space_2,
    borderColor: Assets.AppColors.feature,
    marginLeft: Const.space_10,
  };
  /**
   * @type {StyleProp<TextStyle>}
   */
  let cardTextStyle = {
    fontFamily: Font.semiBold,
    fontSize: FontSize.s_14,
  };
  switch (type) {
    case 'active':
      cardTag = t('Now Active');
      cardWrapperStyle = {
        ...cardWrapperStyle,
        backgroundColor: Assets.AppColors.feature,
      };
      cardTextStyle = {
        ...cardTextStyle,
        color: Assets.AppColors.white,
      };
      break;
    case 'paid':
      cardTag = t('Paid');
      cardTextStyle = {
        ...cardTextStyle,
        color: Assets.AppColors.feature,
      };
      break;
    case 'completed':
      cardTag = t('Completed');
      cardWrapperStyle = {
        ...cardWrapperStyle,
        borderColor: Assets.AppColors.malachite,
      };
      cardTextStyle = {
        ...cardTextStyle,
        color: Assets.AppColors.malachite,
      };
      break;
    case 'canceled':
      cardTag = t('Canceled');
      cardWrapperStyle = {
        ...cardWrapperStyle,
        borderColor: Assets.AppColors.grapeFruit,
      };
      cardTextStyle = {
        ...cardTextStyle,
        color: Assets.AppColors.grapeFruit,
      };
      break;
  }

  function handleViewTicket() {
    NavigatorUtils.gotoParkingTicket({});
  }
  function handleCancelParking() {
    bottomSheetCancelRef.current.hide();
    NavigatorUtils.gotoCancelParking({});
  }
  return (
    <View
      style={{
        paddingLeft: Const.space_15,
        paddingRight: Const.space_25,
        paddingVertical: Const.space_17,
        backgroundColor: Assets.AppColors.snowDrift,
        borderRadius: Const.space_10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <Image
          source={parking.image}
          style={{
            width: 98,
            height: 98,
            resizeMode: 'contain',
            borderRadius: Const.space_19,
            marginRight: Const.space_25,
          }}
        />
        <View
          style={{
            maxWidth: '60%',
          }}
        >
          <Text
            style={{
              fontFamily: Font.semiBold,
              fontSize: FontSize.s_20,
              color: Assets.AppColors.black,
              flexWrap: 'wrap',
              flexShrink: 1,
            }}
          >
            {parking.name}
          </Text>
          <Text
            style={{
              flexWrap: 'wrap',
              flexShrink: 1,
              fontFamily: Font.medium,
              fontSize: FontSize.s_14,
              color: Assets.AppColors.starDust,
            }}
          >
            {parking.address}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: Const.space_16,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: SecondFont.bold,
                  fontSize: FontSize.s_16,
                  color: Assets.AppColors.feature,
                }}
              >
                $6.58
              </Text>
              <Text
                style={{
                  fontFamily: SecondFont.bold,
                  fontSize: FontSize.s_8,
                  color: Assets.AppColors.starDust,
                }}
              >
                {' '}
                / hour
              </Text>
            </View>
            <View style={cardWrapperStyle}>
              <Text style={cardTextStyle}>{cardTag}</Text>
            </View>
          </View>
        </View>
      </View>
      {type !== 'canceled' ? (
        <>
          <View
            style={{
              height: Const.space_1,
              backgroundColor: Assets.AppColors.inactiveColor,
              marginTop: 33,
              marginBottom: Const.space_20,
              width: Const.deviceWidth - 114,
              marginLeft: Const.space_5,
            }}
          />
          <View>
            {type === 'completed' ? (
              <View
                style={{
                  paddingLeft: Const.space_23,
                  paddingRight: Const.space_10,
                }}
              >
                <RadiusButton
                  title={t('View Ticket')}
                  type="hollow"
                  onPress={handleViewTicket}
                />
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <RadiusButton
                  title={t('Cancel Booking')}
                  type="hollow"
                  onPress={() => bottomSheetCancelRef.current.show()}
                  style={{
                    width: 150,
                  }}
                />
                <RadiusButton
                  title={t('View Ticket')}
                  type="positive"
                  onPress={handleViewTicket}
                  style={{
                    width: 150,
                  }}
                />
              </View>
            )}
          </View>
        </>
      ) : null}
      <BottomSheet
        refBottomSheet={bottomSheetCancelRef}
        enableSwipeToDismiss
        hideOnBackdropPress
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
                marginBottom: Const.space_22,
              }}
            >
              <Text
                style={{
                  fontFamily: Font.bold,
                  fontStyle: 'normal',
                  fontSize: FontSize.s_24,
                  lineHeight: Const.space_35,
                  fontWeight: '600',
                  color: Assets.AppColors.grapeFruit,
                  paddingTop: Const.space_16,
                  paddingBottom: Const.space_13,
                }}
              >
                {t('Cancel Parking')}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: Font.semiBold,
                fontSize: FontSize.s_20,
                fontWeight: '600',
                color: Assets.AppColors.davyGrey,
                textAlign: 'center',
              }}
            >
              {t('Are you sure you want to cancel you Parking Reservation?')}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: Font.medium,
                fontSize: FontSize.s_15,
                color: Assets.AppColors.starDust,
              }}
            >
              {t(
                'Only 80% of the money you can refund from your payment according tp our policy',
              )}
            </Text>
            <View
              style={{
                marginBottom: Const.space_30,
                flexDirection: 'row',
                width: Const.deviceWidth - 52,
                justifyContent: 'space-between',
                marginTop: Const.space_18,
              }}
            >
              <RadiusButton
                title={t('Cancel')}
                type="negative"
                onPress={() => bottomSheetCancelRef.current.hide()}
                style={{
                  width: (Const.deviceWidth - 81) / 2,
                }}
              />
              <RadiusButton
                title={t('Yes, Remove')}
                type="positive"
                onPress={handleCancelParking}
                style={{
                  width: (Const.deviceWidth - 81) / 2,
                }}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: Assets.AppColors.white,
    paddingHorizontal: Const.space_31,
  },
});
