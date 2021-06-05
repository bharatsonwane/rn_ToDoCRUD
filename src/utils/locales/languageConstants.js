import i18n from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const changi18nextLanguage = (lang) => {
    return i18n.changeLanguage(lang);
}



// Plugin i18next-react-native-async-storage 
function callFallbackIfFunc(fallback, callback){
    console.log(fallback)
    console.log(callback)
    if(typeof fallback === 'function'){
      return fallback(callback)
    }
    return callback(fallback)
  }
  
  export const AsyncStoragePlugin = (fallback) =>{
    return {
      type: 'languageDetector',
      async: true,
      init: () => {},
      detect: async function(callback){
        try {
          await AsyncStorage.getItem('@i18next-async-storage/user-language')
            .then(language => {
              if(language){
                return callback(language)
              }
  
              return callFallbackIfFunc(fallback, callback)
            })
        } catch(error){
          callFallbackIfFunc(fallback, callback)
        }
  
      },
      cacheUserLanguage: async function(language){
        try {
          await AsyncStorage.setItem('@i18next-async-storage/user-language', language)
        } catch(error){
  
        }
      }
    }
  };
  