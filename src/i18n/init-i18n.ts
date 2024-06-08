import { StorageKeys } from '@constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocales } from 'expo-localization';
import i18n from 'i18next';
import { useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LANGUAGE } from './i18n.constants';
import { Language } from './i18n.types';
import { en, fr, tr } from './locales';

export const useInitI18n = (enabled = true) => {
  const [isLoading, setLoading] = useState(enabled);
  const [deviceLanguage] = useLocales();

  useEffect(() => {
    const storageLanguage = deviceLanguage?.languageCode;

    const supportedStorageLanguage: undefined | Language = Object.values(Language).includes(
      storageLanguage as Language,
    )
      ? (storageLanguage as Language)
      : undefined;

    const init = async () => {
      let storageLanguage: string | null = null;
      try {
        storageLanguage = await AsyncStorage.getItem(StorageKeys.Language);
      } catch {
        console.error('AsyncStorage has failed to retrieve the store language');
      }

      await i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
          compatibilityJSON: 'v3',
          fallbackLng: DEFAULT_LANGUAGE,
          interpolation: {
            escapeValue: false,
          },
          lng: storageLanguage ?? supportedStorageLanguage ?? DEFAULT_LANGUAGE,
          load: 'languageOnly',
          resources: {
            en: { translation: en },
            fr: { translation: fr },
            tr: { translation: tr },
          },
          returnNull: false,
        });

      setLoading(false);
    };

    if (enabled) {
      init();
    }
  }, [deviceLanguage?.languageCode, enabled]);

  return { isLoading };
};
