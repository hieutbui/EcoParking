import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

import vi from '../../assets/locales/vi.json';
import en from '../../assets/locales/en.json';
import 'moment/locale/vi';

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    compatibilityJSON: 'v3',
    supportedLngs: ['en', 'vi'],
    interpolation: {
      escapeValue: false,
    },
    lng: 'en',
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    react: {
      useSuspense: false,
    },
    returnObjects: true,
  });

export default i18n;
