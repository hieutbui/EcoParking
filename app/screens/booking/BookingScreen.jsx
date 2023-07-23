import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize, SecondFont } from 'app/constants/Styles';
import api from 'app/controllers/api';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StyleProp,
  TextStyle,
  ViewStyle,
  ScrollView,
  FlatList,
} from 'react-native';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import { ParkingInfo } from 'app/types';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import { BottomSheet } from 'app/shared/components/BottomSheet';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'app/shared/utils';
import { thunkGetSingleTicket } from 'app/controllers/slice/ticket.slice';

const OngoingRoute = () => {
  const { ongoing } = useAppSelector(state => state.account);
  return <RenderTabView data={ongoing} />;
};

const CompleteRoute = () => {
  const { completed } = useAppSelector(state => state.account);
  return <RenderTabView data={completed} />;
};

const CanceledRoute = () => {
  const { canceled } = useAppSelector(state => state.account);
  return <RenderTabView data={canceled} />;
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
 * @property {string} ticketDetailId
 * @property {string} carNumber
 * @param {ParkingCardParams} props
 * @returns {JSX.Element}
 */
const ParkingCard = props => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { type, parking, carNumber, ticketDetailId } = props;
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

  async function handleViewTicket() {
    await Promise.all(dispatch(thunkGetSingleTicket({ ticketDetailId })));
    NavigatorUtils.gotoParkingTicket({
      previous: 'booking',
      ticketDetailId,
      parkName: parking.name,
      carNumber,
    });
  }
  function handleCancelParking() {
    bottomSheetCancelRef.current.hide();
    NavigatorUtils.gotoCancelParking({ ticketDetailId });
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
          source={{ uri: parking.image }}
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
                $0
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

function RenderTabView({ data }) {
  return (
    <FlatList
      data={data}
      style={styles.tabContainer}
      ItemSeparatorComponent={ItemSeparator}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item._id}
      renderItem={RenderItem}
      removeClippedSubviews={true}
      initialNumToRender={2}
      windowSize={11}
      maxToRenderPerBatch={1}
      ListFooterComponent={ItemSeparator}
    />
  );
}

function ItemSeparator() {
  return (
    <View
      style={{
        height: Const.space_20,
        width: '100%',
      }}
    />
  );
}

function RenderItem({ item, index }) {
  /**
   * @type {'active' | 'paid' | 'completed' | 'canceled'}
   */
  let cardType;
  switch (item.status) {
    case 'paid':
      cardType = 'paid';
      break;
    case 'canceled':
      cardType = 'canceled';
      break;
    case 'nowActive':
      cardType = 'active';
      break;
    case 'completed':
      cardType = 'completed';
      break;
  }
  return (
    <ParkingCard
      key={index}
      type={cardType}
      carNumber={item.carNumber}
      ticketDetailId={item._id}
      parking={{
        _id: item.parking._id,
        unitPrice: '235y29',
        name: item.parking.name,
        address: item.parking.address,
        quantity: item.parking.quantity,
        image: item.parking.image,
        longitude: {
          $numberDecimal: item.parking.longitude.$numberDecimal,
        },
        latitude: {
          $numberDecimal: item.parking.latitude.$numberDecimal,
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: Assets.AppColors.white,
    paddingHorizontal: Const.space_31,
  },
});
