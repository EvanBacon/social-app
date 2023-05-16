import React from 'react'
import {View} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import {withAuthRequired} from 'view/com/auth/withAuthRequired'
import {ViewHeader} from '../com/util/ViewHeader'
import {ProfileFollows as ProfileFollowsComponent} from '../com/profile/ProfileFollows'
import {useStores} from 'state/index'
import {useLocalSearchParams} from 'expo-router'

export const ProfileFollowsScreen = withAuthRequired(() => {
  const store = useStores()
  const {name} = useLocalSearchParams<{name: string}>()

  useFocusEffect(
    React.useCallback(() => {
      store.shell.setMinimalShellMode(false)
    }, [store]),
  )

  return (
    <View>
      <ViewHeader title="Following" />
      <ProfileFollowsComponent name={name} />
    </View>
  )
})
