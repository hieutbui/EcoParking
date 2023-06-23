import Assets from 'app/assets/Assets';
import { Const } from 'app/constants/Const';
import { Header } from 'app/shared/components/Header';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import utils from 'app/shared/utils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

export const ProfileScreen = () => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header title={t('Profile')} />
      <View style={{ flex: 1, backgroundColor: Assets.AppColors.white }}>
        <RadiusButton
          title={'Toast'}
          type={'hollow'}
          onPress={() =>
            utils.toast({ message: 'Toast opened', duration: 2000 })
          }
          rightIcon={Assets.AppIcons.icBack}
          rightIconStyle={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
          }}
        />
        <RadiusButton
          title={'Show loading'}
          type={'hollow'}
          onPress={() => utils.showLoading({ message: 'Loading...' })}
          rightIcon={Assets.AppIcons.icBack}
          rightIconStyle={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
          }}
        />
        <RadiusButton
          title={'Show loading'}
          type={'hollow'}
          onPress={() =>
            utils.showDialog({
              title: 'Successful!',
              message: 'Successfully made payment for you parking',
              image: Assets.AppIcons.icSuccessDialog,
              options: [
                {
                  title: 'View Parking Ticket',
                  type: 'positive',
                  onPress: () => {},
                  style: {
                    marginBottom: Const.space_16,
                  },
                },
                {
                  title: 'Cancel',
                  type: 'negative',
                  onPress: () => {},
                },
              ],
            })
          }
          rightIcon={Assets.AppIcons.icBack}
          rightIconStyle={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );
};
