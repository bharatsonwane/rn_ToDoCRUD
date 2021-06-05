import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {AsyncStoragePlugin} from "./languageConstants"

import common_en from './languageJson/en/translation.json'
import common_hi from './languageJson/hi/translation.json'
import common_chi from './languageJson/chi/translation.json'


// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

const Languages = ['en','hi','chi'];


i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(AsyncStoragePlugin())
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,
    whitelist : Languages,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources:{
        en : {
            common : common_en
        },
        hi : {
            common : common_hi
        },
        chi : {
            common : common_chi
        },
    },
    
  });


export default i18n;