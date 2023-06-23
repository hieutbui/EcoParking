import { rootNavigation } from 'app/screens/AppNavigator';
import { ScreenNames } from 'app/constants/ScreenNames';
import {
  NavigationProp,
  ParamListBase,
  StackActions,
  NavigationAction,
} from '@react-navigation/native';

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
  navigate(ScreenNames.Login, params, navigation);
};

export default {
  goBack,
  gotoHome,
  gotoMainTabBar,
  gotoRegister,
  gotoUpdateProfile,
  gotoLogin,
};
