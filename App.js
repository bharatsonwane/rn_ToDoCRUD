import React, { Suspense } from 'react'
import { Provider } from 'react-redux'
import store from "./src/Redux-store/store"
import RootNavigation from "./src/containers/RootNavigation"
import { Text } from 'react-native'
import "./src/utils/locales/i18n"



export default function App() {
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
