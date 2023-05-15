import {StyleSheet} from 'react-native'
import {Stack} from 'expo-router'
import {useColorSchemeStyle} from 'lib/hooks/useColorSchemeStyle'
import {colors} from 'lib/styles'

export const unstable_settings = {
  profile: {
    initialRouteName: '[profile]',
  },
}

export default function Layout({segment}) {
  const contentStyle = useColorSchemeStyle(styles.bgLight, styles.bgDark)
  // const store = useStores()

  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
        headerShown: false,
        animationDuration: 250,
        contentStyle,
      }}
    />
  )
}

const styles = StyleSheet.create({
  bgDark: {
    backgroundColor: colors.black,
  },
  bgLight: {
    backgroundColor: colors.white,
  },
})
