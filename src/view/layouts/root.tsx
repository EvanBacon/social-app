import * as SplashScreen from 'expo-splash-screen'
import * as analytics from 'lib/analytics'
import * as notifee from 'lib/notifee'
import {withSentry} from 'lib/sentry'
import {ThemeProvider} from 'lib/ThemeContext'
import {observer} from 'mobx-react-lite'
import {useEffect, useState} from 'react'
import {RootSiblingParent} from 'react-native-root-siblings'
import * as view from '../index'
import * as Toast from 'view/com/util/Toast'
import {Shell} from 'view/shell'
import {Platform} from 'react-native'
import {RootStoreModel, RootStoreProvider, setupState} from '../../state'

// import {handleLink} from '../../Navigation'

// SplashScreen.preventAutoHideAsync()

const App = observer(() => {
  const [rootStore, setRootStore] = useState<RootStoreModel | undefined>(
    undefined,
  )

  // init
  useEffect(() => {
    view.setup()
    setupState().then(store => {
      setRootStore(store)
      analytics.init(store)
      if (Platform.OS !== 'web') {
        notifee.init(store)
        SplashScreen.hideAsync()
        store.onSessionDropped(() => {
          Toast.show('Sorry! Your session expired. Please log in again.')
        })
      }
    })
  }, [])

  // show nothing prior to init
  if (!rootStore) {
    return null
  }
  return (
    <ThemeProvider theme={rootStore.shell.darkMode ? 'dark' : 'light'}>
      <RootSiblingParent>
        <analytics.Provider>
          <RootStoreProvider value={rootStore}>
            <Shell />
          </RootStoreProvider>
        </analytics.Provider>
      </RootSiblingParent>
    </ThemeProvider>
  )
})

export default withSentry(App)
