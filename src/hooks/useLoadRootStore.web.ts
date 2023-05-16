import * as analytics from 'lib/analytics'
import {useMemo} from 'react'
import {web_setupStateSync} from '@/state/index'

import * as view from 'view/index'

export function useLoadRootStore() {
  // Ensure this loads sync to keep static rendering working.
  return useMemo(() => {
    const store = web_setupStateSync()
    view.setup()
    analytics.init(store)
    return store
  }, [])
}
