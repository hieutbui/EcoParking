import { persistor, store } from 'app/controllers/redux/AppStore';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'app/controllers/language/i18n';
import { AppNavigator } from './AppNavigator';
import { StatusBar } from 'react-native';
import { mapboxToken } from '../../env.json';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken(mapboxToken);

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            {/* statusbar */}
            <StatusBar
              backgroundColor={'transparent'}
              translucent
              barStyle={'dark-content'}
            />
            {/* navigator */}
            <AppNavigator />
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
