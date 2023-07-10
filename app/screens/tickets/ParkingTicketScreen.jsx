import { useNavigation } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export const ParkingTicketScreen = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const QRvalue = 'asdkjfbaskjg';

  const QRSize = 200;

  const data = {
    name: 'asdfbasg',
    parking: 'asdga yaw hw has jfas khgs kabk gasg',
    duration: '4 hours',
    hours: '09 AM - 13 PM',
    vehicle: '12A-589259',
    date: 'May 11, 2023',
    phone: '+84 899551022',
  };

  return (
    <View
      style={{
        backgroundColor: Assets.AppColors.white,
        flex: 1,
      }}
    >
      <Header
        leftIcon={Assets.AppIcons.icBack}
        onPressLeft={() => NavigatorUtils.gotoBooking({}, navigation)}
        title={t('Parking Ticket')}
        style={{
          marginBottom: Const.space_28,
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: Const.space_31 }}>
        <View
          style={{
            paddingHorizontal: Const.space_20,
            alignItems: 'center',
            paddingTop: Const.space_19,
            paddingBottom: Const.space_24,
            borderRadius: Const.space_23,
            borderStyle: 'dashed',
            borderColor: Assets.AppColors.inactiveColor,
            borderWidth: Const.space_2,
          }}
        >
          <Text
            style={{
              marginBottom: Const.space_17,
              textAlign: 'center',
              fontFamily: Font.medium,
              fontSize: FontSize.s_16,
              color: Assets.AppColors.starDust,
            }}
          >
            {t(
              'Scan this on the scanner machine when you are in the parking lot',
            )}
          </Text>
          <QRCode
            value={QRvalue}
            logo={Assets.AppIcons.icParkingFeature}
            size={QRSize}
          />
        </View>
        <View
          style={{
            paddingHorizontal: Const.space_20,
            paddingTop: Const.space_12,
            borderRadius: Const.space_23,
            borderStyle: 'solid',
            borderColor: Assets.AppColors.inactiveColor,
            borderWidth: Const.space_2,
            borderTopWidth: Const.space_0,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              maxWidth: '49%',
            }}
          >
            <Text style={styles.ticketFieldName}>{t('Name')}</Text>
            <Text style={styles.ticketFieldData}>{data.name}</Text>
            <Text style={styles.ticketFieldName}>{t('Parking Area')}</Text>
            <Text style={styles.ticketFieldData}>{data.parking}</Text>
            <Text style={styles.ticketFieldName}>{t('Duration')}</Text>
            <Text style={styles.ticketFieldData}>{data.duration}</Text>
            <Text style={styles.ticketFieldName}>{t('Hours')}</Text>
            <Text style={styles.ticketFieldData}>{data.hours}</Text>
          </View>
          <View
            style={{
              maxWidth: '49%',
            }}
          >
            <Text style={styles.ticketFieldName}>{t('Vehicle')}</Text>
            <Text style={styles.ticketFieldData}>{data.vehicle}</Text>
            <Text style={styles.ticketFieldName}>{t('Date')}</Text>
            <Text style={styles.ticketFieldData}>{data.date}</Text>
            <Text style={styles.ticketFieldName}>{t('Phone')}</Text>
            <Text style={styles.ticketFieldData}>{data.phone}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: Const.space_31,
          paddingBottom: Const.space_30,
        }}
      >
        <RadiusButton
          title={t('Navigate to Parking Lot')}
          type="positive"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ticketFieldName: {
    fontFamily: Font.medium,
    fontSize: FontSize.s_16,
    color: Assets.AppColors.starDust,
  },
  ticketFieldData: {
    fontFamily: Font.semiBold,
    fontSize: FontSize.s_15,
    color: Assets.AppColors.black,
    marginBottom: Const.space_28,
  },
});
