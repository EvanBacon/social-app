import {SplashScreen} from 'expo-router'
import * as analytics from 'lib/analytics'
import * as notifee from 'lib/notifee'
import {getRoutingInstrumentation, withSentry} from 'lib/sentry'
import {ThemeProvider} from 'lib/ThemeContext'
import {observer} from 'mobx-react-lite'
import {useEffect, useState} from 'react'
import {RootSiblingParent} from 'react-native-root-siblings'
import * as view from 'view/index'
import * as Toast from 'view/com/util/Toast'
import {Platform} from 'react-native'
import {RootStoreModel, RootStoreProvider, setupState} from 'state/index'
import {useColorSchemeStyle} from 'lib/hooks/useColorSchemeStyle'
import {
  ThemeProvider as ReactNavigationThemeProvider,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import {Shell} from 'view/shell'

export const unstable_settings = {
  initialRouteName: '(index)',
}

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
        store.onSessionDropped(() => {
          Toast.show('Sorry! Your session expired. Please log in again.')
        })

        // TODO: Handle this
        // const routingInstrumentation = getRoutingInstrumentation()
        // routingInstrumentation.registerNavigationContainer(useNavigation)
      }
    })
  }, [])

  const theme = useColorSchemeStyle(DefaultTheme, DarkTheme)

  // show nothing prior to init
  if (!rootStore) {
    // TODO: Never delay rendering the navigation tree
    return <SplashScreen />
  }

  return (
    <ReactNavigationThemeProvider value={theme}>
      <ThemeProvider theme={rootStore.shell.darkMode ? 'dark' : 'light'}>
        <RootSiblingParent>
          <analytics.Provider>
            <RootStoreProvider value={rootStore}>
              <Shell />
            </RootStoreProvider>
          </analytics.Provider>
        </RootSiblingParent>
      </ThemeProvider>
    </ReactNavigationThemeProvider>
  )
})

export default withSentry(App)
