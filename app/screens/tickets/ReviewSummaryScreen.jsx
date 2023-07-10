import { useNavigation } from '@react-navigation/native';
import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Font, FontSize } from 'app/constants/Styles';
import { Header } from 'app/shared/components/Header';
import { RadioButton } from 'app/shared/components/RadioButton';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import utils from 'app/shared/utils';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

export const ReviewSummaryScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const amount = 8.0;
  const taxes = 0.08;
  const total = amount + taxes;
  /**
   * @type {{fieldName: string, fieldData: string}[]}
   */
  const ticketData = [
    {
      fieldName: t('Parking'),
      fieldData: '29 P.Võ thị Sáu, Thanh Nhàn, Hai Bà Trưng, Hà Nội, Việt Nam',
    },
    {
      fieldName: t('Address'),
      fieldData: '9569, trantow Courts',
    },
    {
      fieldName: t('Date'),
      fieldData: 'May 11, 2023',
    },
    {
      fieldName: t('Duration'),
      fieldData: '4 hours',
    },
    {
      fieldName: t('Hours'),
      fieldData: '09:00 AM  -  13:00 PM',
    },
  ];

  /**
   * @type {{fieldName: string, fieldData: string}[]}
   */
  const feesData = [
    {
      fieldName: t('Amount'),
      fieldData: amount.toString(),
    },
    {
      fieldName: t('Taxes & Fees'),
      fieldData: taxes.toString(),
    },
    {
      fieldName: t('Total'),
      fieldData: total.toString(),
    },
  ];

  return (
    <View
      style={{
        backgroundColor: Assets.AppColors.white,
        flex: 1,
      }}
    >
      <Header
        leftIcon={Assets.AppIcons.icBack}
        onPressLeft={() => NavigatorUtils.goBack()}
        title={t('Review Summary')}
        style={{
          marginBottom: Const.space_28,
        }}
      />
      <View
        style={{
          paddingHorizontal: Const.space_31,
          flex: 1,
        }}
      >
        <View
          style={{
            paddingVertical: Const.space_20,
            backgroundColor: Assets.AppColors.whiteSmoke,
            borderRadius: Const.space_23,
            marginBottom: 30,
          }}
        >
          {ticketData.map((data, index) => {
            return (
              <RenderDataRow
                key={index}
                name={data.fieldName}
                data={data.fieldData}
              />
            );
          })}
        </View>
        <View
          style={{
            paddingVertical: Const.space_20,
            backgroundColor: Assets.AppColors.whiteSmoke,
            borderRadius: Const.space_23,
            marginBottom: 30,
          }}
        >
          {feesData.map((data, index) => {
            return (
              <View key={index}>
                {index === 2 ? (
                  <View
                    style={{
                      height: Const.space_1,
                      backgroundColor: Assets.AppColors.starDust,
                      marginHorizontal: Const.space_26,
                    }}
                  />
                ) : null}
                <RenderDataRow name={data.fieldName} data={data.fieldData} />
              </View>
            );
          })}
        </View>
        <RadioButton
          leftIcon={Assets.AppIcons.icBookingActive}
          title="sajkfbsakjdgbksjag"
          rightText={t('change')}
          onPress={() => {}}
        />
      </View>
      <View
        style={{
          paddingHorizontal: Const.space_31,
          marginBottom: Const.space_30,
        }}
      >
        <RadiusButton
          type={'positive'}
          title={t('Continue')}
          onPress={() => {
            utils.showDialog({
              image: Assets.AppIcons.icSuccessDialog,
              title: t('Successful'),
              message: t('Successfully made payment for you parking'),
              options: [
                {
                  type: 'positive',
                  title: t('View Parking Ticket'),
                  onPress: () => {
                    utils.hideDialog();
                    NavigatorUtils.gotoParkingTicket({}, navigation);
                  },
                },
                {
                  type: 'negative',
                  title: t('Cancel'),
                  onPress: () => {
                    utils.hideDialog();
                  },
                },
              ],
            });
          }}
        />
      </View>
    </View>
  );
};

/**
 * @typedef RowParams
 * @property {string} name
 * @property {string} data
 * @param {RowParams} param
 */
function RenderDataRow({ name, data }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: Const.space_26,
        paddingBottom: Const.space_15,
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          color: Assets.AppColors.starDust,
          fontSize: FontSize.s_16,
          fontFamily: Font.medium,
          marginRight: Const.space_10,
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          fontFamily: Font.semiBold,
          fontSize: FontSize.s_16,
          color: Assets.AppColors.black,
          textAlign: 'right',
          flexWrap: 'wrap',
          flexShrink: 1,
        }}
      >
        {data}
      </Text>
    </View>
  );
}
