import * as analytics from 'lib/analytics'
import * as notifee from 'lib/notifee'
import {useEffect, useState} from 'react'
import {RootStoreModel, setupState} from 'state/index'
import * as view from 'view/index'
import * as Toast from 'view/com/util/Toast'

export function useLoadRootStore() {
  const [rootStore, setRootStore] = useState<RootStoreModel | undefined>(
    undefined,
  )

  // init
  useEffect(() => {
    view.setup()
    setupState().then(store => {
      setRootStore(store)
      analytics.init(store)
      notifee.init(store)
      store.onSessionDropped(() => {
        Toast.show('Sorry! Your session expired. Please log in again.')
      })

      // TODO: Handle this
      // const routingInstrumentation = getRoutingInstrumentation()
      // routingInstrumentation.registerNavigationContainer(useNavigation)
    })
  }, [])

  return rootStore
}
