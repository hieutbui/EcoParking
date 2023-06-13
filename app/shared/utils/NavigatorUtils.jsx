import { rootNavigation } from 'app/screens/AppNavigator';
import { ScreenNames } from 'app/constants/ScreenNames';
import {
  NavigationProp,
  ParamListBase,
  StackActions,
  NavigationAction,
} from '@react-navigation/native';

const tag = '[NavigatorUtil]';

const navigate = (screenm, params, navigation = rootNavigation) => {};

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
  gotoMainTabBar(params, {}, navigation);
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

export default {
  goBack,
  gotoHome,
  gotoMainTabBar,
};
