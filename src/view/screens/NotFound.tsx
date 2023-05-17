import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useFocusEffect} from 'expo-router'
import {ViewHeader} from '../com/util/ViewHeader'
import {Text} from '../com/util/text/Text'
import {Button} from 'view/com/util/forms/Button'
import {NavigationProp} from 'lib/routes/types'
import {usePalette} from 'lib/hooks/usePalette'
import {useStores} from 'state/index'
import {s} from 'lib/styles'
import {useRouter} from 'expo-router'

export const NotFoundScreen = () => {
  const pal = usePalette('default')
  const router = useRouter()
  const navigation = useNavigation<NavigationProp>()
  const store = useStores()

  useFocusEffect(
    React.useCallback(() => {
      store.shell.setMinimalShellMode(false)
    }, [store]),
  )

  const canGoBack = navigation.canGoBack()
  const onPressHome = React.useCallback(() => {
    if (canGoBack) {
      router.back()
    } else {
      router.replace('/')
    }
  }, [router, canGoBack])

  return (
    <View testID="notFoundView" style={pal.view}>
      <ViewHeader title="Page not found" />
      <View style={styles.container}>
        <Text type="title-2xl" style={[pal.text, s.mb10]}>
          Page not found
        </Text>
        <Text type="md" style={[pal.text, s.mb10]}>
          We're sorry! We can't find the page you were looking for.
        </Text>

        <Button
          type="primary"
          label={canGoBack ? 'Go back' : 'Go home'}
          onPress={onPressHome}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 20,
    alignItems: 'center',
    height: '100%',
  },
})
