import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import NavigatorUtils from 'app/shared/utils/NavigatorUtils';
import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { Font, FontSize } from 'app/constants/Styles';

export const ParkingTimerScreen = () => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Assets.AppColors.white,
      }}
    >
      <Header
        title={t('Parking Timer')}
        leftIcon={Assets.AppIcons.icBack}
        onPressLeft={() => NavigatorUtils.goBack()}
        style={{
          marginBottom: Const.space_28,
        }}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: Const.space_31,
        }}
      >
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <CountdownCircleTimer
            isPlaying
            duration={120}
            size={300}
            strokeWidth={18}
            rotation="counterclockwise"
            colors={[Assets.AppColors.feature]}
          >
            {({ remainingTime }) => {
              time = Number(remainingTime);
              let hours = Math.floor(time / 3600);
              let minutes = Math.floor((time % 3600) / 60);
              let seconds = Math.floor((time % 3600) % 60);

              hours = hours.toString().length === 2 ? hours : '0' + hours;
              minutes =
                minutes.toString().length === 2 ? minutes : '0' + minutes;
              seconds =
                seconds.toString().length === 2 ? seconds : '0' + seconds;
              return (
                <View
                  style={{
                    flexDirection: 'row',
                  }}
                >
                  <View style={styles.timeWrapper}>
                    <Text style={styles.timeNumber}>{hours}</Text>
                    <Text style={styles.timeWord}>{t('Hours')}</Text>
                  </View>
                  <Text style={styles.timeColon}> : </Text>
                  <View style={styles.timeWrapper}>
                    <Text style={styles.timeNumber}>{minutes}</Text>
                    <Text style={styles.timeWord}>{t('Minutes')}</Text>
                  </View>
                  <Text style={styles.timeColon}> : </Text>
                  <View style={styles.timeWrapper}>
                    <Text style={styles.timeNumber}>{seconds}</Text>
                    <Text style={styles.timeWord}>{t('Seconds')}</Text>
                  </View>
                </View>
              );
            }}
          </CountdownCircleTimer>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: Const.space_31,
          paddingBottom: Const.space_30,
        }}
      >
        <RadiusButton
          title={t('Extend Parking Time')}
          type={'positive'}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeNumber: {
    fontFamily: Font.semiBold,
    fontSize: FontSize.s_28,
    color: Assets.AppColors.black,
  },
  timeWord: {
    fontFamily: Font.semiBold,
    fontSize: FontSize.s_9,
    color: Assets.AppColors.starDust,
  },
  timeColon: {
    fontFamily: Font.semiBold,
    fontSize: FontSize.s_28,
    color: Assets.AppColors.black,
  },
});
