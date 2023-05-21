import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import store from "./src/Redux-store/store"
import RootNavigation from "./src/containers/RootNavigation"
import { Text } from 'react-native'
import "./src/utils/locales/i18n"
import { debugNetworkStatus, asyncStorageValueConsole } from "./src/helper/debug/debugNetworkAsyncStorage";



export default function App() {
  asyncStorageValueConsole("Starting App") // log asyncStorage in DEV env
  debugNetworkStatus() // uncomment only if debugging in Browser
  
  return (
    <React.Fragment>
      <Suspense fallback={<Text>loading</Text>}>
        <Provider store={store}>
          <RootNavigation />
        </Provider>
      </Suspense>
    </React.Fragment>
  )
}
