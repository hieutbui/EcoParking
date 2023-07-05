import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  combineReducers,
  configureStore,
  EnhancedStore,
  Reducer,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {
  createBlacklistFilter,
  createWhitelistFilter,
} from 'redux-persist-transform-filter';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { StoreState } from 'app/types';
import appSlice from '../slice/app.slice';
import accountSlice from '../slice/account.slice';
import parkingSlice from '../slice/parking.slice';
import Global from 'app/constants/Global';

const reducers = combineReducers({
  app: appSlice,
  account: accountSlice,
  parking: parkingSlice,
});

/**
 * @type {Reducer<StoreState>}
 */
const rootReducer = (state, action) => {
  if (action.type === '/logout/pending') {
    AsyncStorage.multiRemove(['persist:root']);

    return reducers(
      {
        app: state.app,
      },
      action,
    );
  } else if (action.type === '/logout/fullfilled') {
    Global.AccessToken = '';
    Global.RefreshToken = '';
    Global.UserId = null;
  } else if (action.type === 'REHYDRATE') {
    if (state.account.userInfo) {
      Global.AccessToken = state.account.userInfo.accessToken;
      Global.RefreshToken = state.account.userInfo.refreshToken;
      Global.UserId = state.account.userInfo._id;
    }
  }
  return reducers(state, action);
};

/**
 * @type {PersistConfig}
 */
const persisConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: [],
  whitelist: ['app', 'account', 'parking'],
  transforms: [],
};

/**
 * @type {EnhancedStore<StoreState>}
 */
export const store = configureStore({
  reducer: persistReducer(persisConfig, rootReducer),
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store, {}, () => {});
