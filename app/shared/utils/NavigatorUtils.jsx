import { rootNavigation } from 'app/screens/AppNavigator';
import { ScreenNames } from 'app/constants/ScreenNames';
import {
  NavigationProp,
  ParamListBase,
  StackActions,
  NavigationAction,
} from '@react-navigation/native';
import { ParkingInfo, SingleTicket } from 'app/types';
import { store } from 'app/controllers/redux/AppStore';
import { thunkGetBooking } from 'app/controllers/slice/account.slice';
import { thunkGetSavedParkings } from 'app/controllers/slice/parking.slice';

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
  gotoMainTabBar(params, false, navigation);
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
    // navigation.reset({
    //   routes: [{ name: ScreenNames.MainTabBar }],
    //   index: 1,
    // });
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
 * @param {{parkingId: Object, carNumber: string}} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoBookParking = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoBookParking');
  navigate(ScreenNames.BookParking, params, navigation);
};

/**
 * @author hieubt
 * @param {{type: 'booking' | 'edit', parkingId: Object, carNumber: string, checkedIn: string, checkedOut: string}} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoPayment = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoPayment');
  navigate(ScreenNames.Payment, params, navigation);
};

/**
 * @author hieubt
 * @param {{parkingId: Object, carNumber: string, checkedIn: string, checkedOut: string, payment: 'google' | 'paypal' | 'apple'}} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoReviewSummary = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoReviewSummary');
  navigate(ScreenNames.ReviewSummary, params, navigation);
};

/**
 * @author hieubt
 * @param {{parkingId: Object}} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoBooking = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoBooking');
  gotoMainTabBar(params, true, navigation);
  store.dispatch(
    thunkGetBooking({ userId: store.getState().account.userInfo._id }),
  );
  navigate(ScreenNames.Booking, params, navigation);
};

/**
 * @author hieubt
 * @param {{previous: 'create' | 'booking', ticketDetailId: string, carNumber: string, parkName: string, }} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoParkingTicket = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoParkingTicket');
  navigate(ScreenNames.ParkingTicket, params, navigation);
};

/**
 * @author hieubt
 * @param {{parkingId: Object}} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoSelectVehicle = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoSelectVehicle');
  navigate(ScreenNames.SelectVehicle, params, navigation);
};

/**
 * @author hieubt
 * @param {{direction: Object, selectedPark: ParkingInfo}} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoDirection = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoDirection');
  navigate(ScreenNames.Direction, params, navigation);
};

/**
 * @author hieubt
 * @param {any} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoRouteNavigation = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoRouteNavigation');
  navigate(ScreenNames.RouteNavigation, params, navigation);
};

/**
 * @author hieubt
 * @param {any} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoParkingTimer = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoParkingTimer');
  navigate(ScreenNames.ParkingTimer, params, navigation);
};

/**
 * @author hieubt
 * @param {{ticketDetailId: string}} params
 * @param {NavigationProp<ParamListBase>} navigation
 */
const gotoCancelParking = (params, navigation = rootNavigation) => {
  console.log(tag, 'gotoCancelParking');
  navigate(ScreenNames.CancelParking, params, navigation);
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
  gotoSelectVehicle,
  gotoDirection,
  gotoRouteNavigation,
  gotoParkingTimer,
  gotoCancelParking,
};
