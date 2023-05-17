import React from 'react'
import {useFocusEffect} from 'expo-router'
import {withAuthRequired} from 'view/com/auth/withAuthRequired'
import {ViewHeader} from '../com/util/ViewHeader'
import {ProfileFollowers as ProfileFollowersComponent} from '../com/profile/ProfileFollowers'
import {useStores} from 'state/index'
import {useLocalSearchParams} from 'expo-router'

export const ProfileFollowersScreen = withAuthRequired(() => {
  const store = useStores()
  const {name} = useLocalSearchParams<{name: string}>()

  useFocusEffect(
    React.useCallback(() => {
      store.shell.setMinimalShellMode(false)
    }, [store]),
  )

  return (
    <>
      <ViewHeader title="Followers" />
      <ProfileFollowersComponent name={name} />
    </>
  )
})
