import { rootNavigation } from 'app/screens/AppNavigator';
import { ScreenNames } from 'app/constants/ScreenNames';
import {
  NavigationProp,
  ParamListBase,
  StackActions,
  NavigationAction,
} from '@react-navigation/native';
import { ParkingInfo } from 'app/types';

const tag = '[NavigatorUtil]';

const navigate = (screen, params, navigation = rootNavigation) => {
  navigation.navigate(screen, params);
};

/**
 * @author hieubt
 * @param {String} screen
 * @param {any} params
 * @param {NavigationProp<ParamListBase>} navigation
 * @returns {void}
 */
const push = (screen, params, navigation) => {
  if (typeof navigation.dispatch === 'function') {
    const pushAction = StackActions.push(screen, params);
    return navigation.dispatch(pushAction);
  }
};

/**
 *
 * @param {NavigationProp<ParamListBase>} navigation
 */
const goBack = (navigation = rootNavigation) => {
  if (navigation.canGoBack()) {
    navigation.goBack();
  }
};

/**
 *
 * @param {String} screen
 * @param {any} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const replace = (screen, params, navigation) => {
  const replaceAction = StackActions.replace(screen, params);
  navigation?.dispatch(replaceAction);
};

/**
 *
 * @param {any} params
 * @param {NavigationAction<ParamListBase>} navigation
 */
const gotoHome = (params = null, navigation = rootNavigation) => {
  gotoMainTabBar(params, true, navigation);
};

/**
 *
 * @param {any} params
 * @param {Boolean} needReplace
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoMainTabBar = (
  params = null,
  needReplace = false,
  navigation = rootNavigation,
) => {
  console.log(tag, 'gotoMainTabBar');
  if (needReplace) {
    replace(ScreenNames.MainTabBar, params, navigation);
    navigation.reset({
      routes: [{ name: ScreenNames.MainTabBar }],
      index: 1,
    });
  } else {
    navigate(ScreenNames.MainTabBar, params, navigation);
  }
};
/**
 * @author hieubt
 * @param {any} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoRegister = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoRegister');
  navigate(ScreenNames.Register, params, navigation);
};
/**
 * @author hieubt
 * @typedef UpdateProfileParams
 * @property {'Register' | 'Update'} type
 * @property {String} email
 * @property {String} password
 * @param {UpdateProfileParams} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoUpdateProfile = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoUpdateProfile');
  navigate(ScreenNames.UpdateProfile, params, navigation);
};

/**
 * @author hieubt
 * @param {object} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoLogin = (params = null, navigation = rootNavigation) => {
  console.log(tag, 'gotoLogin');
  replace(ScreenNames.Login, {});
  navigation.reset({
    routes: [{ name: ScreenNames.Login }],
    index: 0,
  });
  navigate(ScreenNames.Login, params, navigation);
};

/**
 * @author hieubt
 * @param {{parkingInfo: ParkingInfo, distance: string, duration: string}} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoParkingDetail = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoParkingDetail');
  navigate(ScreenNames.ParkingDetail, params, navigation);
};

/**
 * @author hieubt
 * @param {any} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoNotificationSettings = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoNotificationSettings');
  navigate(ScreenNames.NotificationSettings, params, navigation);
};

/**
 * @author hieubt
 * @param {any} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoSecurity = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoSecurity');
  navigate(ScreenNames.Security, params, navigation);
};

/**
 * @author hieubt
 * @param {any} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoBookParking = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoBookParking');
  navigate(ScreenNames.BookParking, params, navigation);
};

/**
 * @author hieubt
 * @param {{type: 'booking' | 'edit'}} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoPayment = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoPayment');
  navigate(ScreenNames.Payment, params, navigation);
};

/**
 * @author hieubt
 * @param {any} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoReviewSummary = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoReviewSummary');
  navigate(ScreenNames.ReviewSummary, params, navigation);
};

/**
 * @author hieubt
 * @param {any} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoBooking = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoBooking');
  gotoMainTabBar(params, true, navigation);
  navigate(ScreenNames.Booking, params, navigation);
};

/**
 * @author hieubt
 * @param {any} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoParkingTicket = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoParkingTicket');
  navigate(ScreenNames.ParkingTicket, params, navigation);
};

export default {
  goBack,
  gotoHome,
  gotoMainTabBar,
  gotoRegister,
  gotoUpdateProfile,
  gotoLogin,
  gotoParkingDetail,
  gotoNotificationSettings,
  gotoSecurity,
  gotoBookParking,
  gotoPayment,
  gotoReviewSummary,
  gotoBooking,
  gotoParkingTicket,
};
