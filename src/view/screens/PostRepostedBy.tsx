import React from 'react'
import {View} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import {withAuthRequired} from 'view/com/auth/withAuthRequired'
import {ViewHeader} from '../com/util/ViewHeader'
import {PostRepostedBy as PostRepostedByComponent} from '../com/post-thread/PostRepostedBy'
import {useStores} from 'state/index'
import {makeRecordUri} from 'lib/strings/url-helpers'
import {useLocalSearchParams} from 'expo-router'

export const PostRepostedByScreen = withAuthRequired(() => {
  const store = useStores()
  const {name, rkey} = useLocalSearchParams<{name: string; rkey: string}>()
  const uri = makeRecordUri(name, 'app.bsky.feed.post', rkey)

  useFocusEffect(
    React.useCallback(() => {
      store.shell.setMinimalShellMode(false)
    }, [store]),
  )

  return (
    <View>
      <ViewHeader title="Reposted by" />
      <PostRepostedByComponent uri={uri} />
    </View>
  )
})
