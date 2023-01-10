import React, {useEffect} from 'react'
import {View} from 'react-native'
import {ViewHeader} from '../com/util/ViewHeader'
import {PostRepostedBy as PostRepostedByComponent} from '../com/post-thread/PostRepostedBy'
import {ScreenParams} from '../routes'
import {useStores} from '../../state'
import {makeRecordUri} from '../../lib/strings'

export const PostRepostedBy = ({navIdx, visible, params}: ScreenParams) => {
  const store = useStores()
  const {name, rkey} = params
  const uri = makeRecordUri(name, 'app.bsky.feed.post', rkey)

  useEffect(() => {
    if (visible) {
      store.nav.setTitle(navIdx, 'Reposted by')
      store.shell.setMinimalShellMode(false)
    }
  }, [store, visible])

  return (
    <View testID="postRepostedByMainView">
      <ViewHeader title="Reposted by" />
      <PostRepostedByComponent uri={uri} />
    </View>
  )
}
