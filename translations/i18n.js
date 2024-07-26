import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

//see here for rough idea of setup: https://locize.com/blog/react-i18next/
//we do things somewhat differently than main documentation

//languageDetector boilerplate: https://www.i18next.com/misc/creating-own-plugins#languagedetector
//so we are basically creating our own language plugin (note that detect, callback, and cacheUserLanguage are all functions provided by the library. unfortunately documentation is sparse (if not non-existent??) for these.)

//Cases: 
//1) on first app load, localStorage will retrieve null key so we revert to default kk
//2) If a language is selected by the user, we set the cache w/ the selected language code. If a language is not selected by the user, we set the cache w/ default.
//3) On subsequent app loads, there will exist a cache with the key 'user-language'. We retrieve the cached language code.
const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: async(callback) => {
    try {
      const language = localStorage.getItem('user-language'); //.getItem returns null if undefined
      if (!language) {
        callback('kk');
        console.log("LANGUAGE_DETECTOR: 'user-language' not found, using default 'kk'");
      } else {
        callback(language);
        console.log("LANGUAGE_DETECTOR: 'user-language' found, using:", language);
      }
    } catch (error) {
      callback('kk');
      console.log("LANGUAGE_DETECTOR: Error accessing 'user-language', using default 'kk'", error);
    }
  },
  init: () => { },

  //the variable "language" is the current language (change is triggered by i18n.changeLanguage() elsewhere): either en, kk, or ru.
  cacheUserLanguage: async(language) => {
    try {
      localStorage.setItem('user-language', language);
      console.log("LANGUAGE_DETECTOR: 'user-language' set to:", language);
    } catch (error) {
      console.log("LANGUAGE_DETECTOR: Error setting 'user-language'", error);
    }
  }
};

import en from './en';
import kk from './kk';
import ru from './ru';

//please see here for a rough idea of boilerplate: https://locize.com/blog/react-i18next/
i18n
    // detect language by passing in our event listener defined above.
    .use(LANGUAGE_DETECTOR)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // set options
    .init({
        debug: true,
        resources: {
            en: en,
            kk: kk,
            ru: ru,
        },
        //boilerplate from the docs
        react: {
            useSuspense: false
        },
        interpolation: {
            escapeValue: false
        }
    });

