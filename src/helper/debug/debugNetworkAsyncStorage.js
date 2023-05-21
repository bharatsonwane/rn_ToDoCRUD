import AsyncStorage from '@react-native-async-storage/async-storage';

/** HELPER FUNCTION FOR NETWORK DBUGGING */
export const debugNetworkStatus = () => {
  /** https://github.com/jhen0409/react-native-debugger/blob/master/docs/network-inspect-of-chrome-devtools.md */
  if (__DEV__) {
    const getNetworkStatus = () => {
      try {
        global.XMLHttpRequest = global.originalXMLHttpRequest
          ? global.originalXMLHttpRequest
          : global.XMLHttpRequest;
        global.FormData = global.originalFormData
          ? global.originalFormData
          : global.FormData;

        // fetch; // Ensure to get the lazy property

        if (window.__FETCH_SUPPORT__) {
          // it's RNDebugger only to have
          window.__FETCH_SUPPORT__.blob = false;
        } else {
          /*
           * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
           * If you're using another way you can just use the native Blob and remove the `else` statement
           */
          global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
          // global.FileReader = global.originalFileReader ? global.originalFileReader : global.FileReader;
        }
      } catch (error) {}
    };
    getNetworkStatus(); // to comment in __DEV__ env
  }
};

let globalAsyncStoraeObject = {};
let asyncStorageObject = {};

/** HELPER FUNCTION FOR ASYNC STORAGE  */
export const asyncStorageValueConsole = async changeInKey => {
  /**
   * changeInKey is a asyncStorage key in which it's value changes
   * console.info(showAsyncStorageContentInDev())  is a "react-native-debugger"s method which provide Entire async storage in "react-native-debugger"s console.
   */
  if (__DEV__) {
    const getAsyncStorage = () => {
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (error, stores) => {
          stores.map((result, i, store) => {
            let keyName = store[i][0];
            let keyValue = store[i][1];
            try {
              if (JSON.stringify(asyncStorageObject[keyName]) !== keyValue) {
                // console.info("asyncStorageKey initial/change =>", keyName)
                try {
                  asyncStorageObject[keyName] = JSON.parse(keyValue);
                  return true;
                } catch (error) {
                  asyncStorageObject[keyName] = keyValue;
                  return true;
                }
              }
              return true;
            } catch (error) {
              return true;
            }
          });
          if (
            JSON.stringify(globalAsyncStoraeObject) !=
            JSON.stringify(asyncStorageObject)
          ) {
            globalAsyncStoraeObject = JSON.parse(
              JSON.stringify(asyncStorageObject),
            );
            console.info('asyncStorageEntire', changeInKey, asyncStorageObject);
          }
        });
      });
      return true;
    };
    return getAsyncStorage(); // to comment in __DEV__ env
  }
  return true;
};
