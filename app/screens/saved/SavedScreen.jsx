import Assets from 'app/assets/Assets';
import { Font, FontSize } from 'app/constants/Styles';
import { Header } from 'app/shared/components/Header';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, FlatList, Text } from 'react-native';
import { useAppSelector } from 'app/shared/utils';
import { Const } from 'app/constants/Const';
import { RadioButton } from 'app/shared/components/RadioButton';
import { BottomSheet } from 'app/shared/components/BottomSheet';
import { RadiusButton } from 'app/shared/components/RadiusButton';
import _ from 'lodash';
import { ParkingInfo } from 'app/types';
import { useDispatch } from 'react-redux';
import {
  thunkGetSavedParkings,
  thunkUnSaveParking,
} from 'app/controllers/slice/parking.slice';

export const SavedScreen = () => {
  const { t } = useTranslation();
  const { savedParkings } = useAppSelector(state => state.parking);
  const { _id } = useAppSelector(state => state.account.userInfo);
  const dispatch = useDispatch();
  /**
   * @type {[ParkingInfo, React.SetStateAction<ParkingInfo>]}
   */
  const [parkToRemove, setParkToRemove] = useState(null);
  const bottomSheetRemoveRef = useRef(null);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Assets.AppColors.white,
      }}
    >
      <Header
        title={t('MyBookmark')}
        style={{ marginBottom: Const.space_28 }}
      />
      <View
        style={{
          backgroundColor: Assets.AppColors.white,
          flex: 1,
          paddingHorizontal: Const.space_31,
        }}
      >
        <FlatList
          data={savedParkings}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <RenderItems
              item={item}
              onLongPress={park => {
                setParkToRemove(park);
                bottomSheetRemoveRef.current.show();
              }}
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
          ListFooterComponent={ItemSeparator}
        />
      </View>
      <BottomSheet
        refBottomSheet={bottomSheetRemoveRef}
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
                {t('Remove from Bookmark?')}
              </Text>
            </View>
            <RadioButton
              leftIcon={{ uri: parkToRemove?.image }}
              leftIconStyle={{
                height: 60,
                width: 60,
                borderRadius: Const.space_19,
              }}
              title={parkToRemove?.name}
              message={parkToRemove?.address}
              rightIconSource={Assets.AppIcons.icBookmarked}
              textZoneStyle={{
                marginLeft: Const.space_15,
              }}
              disable={true}
            />
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
                onPress={() => bottomSheetRemoveRef.current.hide()}
                style={{
                  width: (Const.deviceWidth - 81) / 2,
                }}
              />
              <RadiusButton
                title={t('Yes, Remove')}
                type="positive"
                onPress={async () => {
                  bottomSheetRemoveRef.current.hide();
                  await Promise.all(
                    dispatch(
                      thunkUnSaveParking({
                        parkingId: parkToRemove?._id,
                        userId: _id,
                      }),
                    ),
                  );
                  dispatch(thunkGetSavedParkings({ userId: _id }));
                }}
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

function ItemSeparator() {
  return <View style={{ height: Const.space_15 }} />;
}

/**
 * @author hieubt
 * @param {{item: ParkingInfo, onLongPress: (park: ParkingInfo)=>void=}} param
 * @returns {JSX.Element}
 */
function RenderItems({ item, onLongPress }) {
  return (
    <RadioButton
      leftIcon={{ uri: item.image }}
      leftIconStyle={{
        height: 60,
        width: 60,
        borderRadius: Const.space_19,
      }}
      title={item.name}
      message={item.address}
      rightIconSource={Assets.AppIcons.icBookmarked}
      textZoneStyle={{
        marginLeft: Const.space_15,
      }}
      onLongPress={() => {
        if (_.isFunction(onLongPress)) {
          onLongPress(item);
        }
      }}
    />
  );
}
