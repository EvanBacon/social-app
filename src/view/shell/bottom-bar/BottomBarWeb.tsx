import React from 'react'
import {observer} from 'mobx-react-lite'
import {useStores} from 'state/index'
import {usePalette} from 'lib/hooks/usePalette'
import {Animated} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {styles} from './BottomBarStyles'
import {clamp} from 'lib/numbers'
import {
  BellIcon,
  BellIconSolid,
  HomeIcon,
  HomeIconSolid,
  MagnifyingGlassIcon2,
  MagnifyingGlassIcon2Solid,
  UserIcon,
} from 'lib/icons'
import {useMinimalShellMode} from 'lib/hooks/useMinimalShellMode'
import {TabLink} from './tab-slot'

export const BottomBarWeb = observer(() => {
  const store = useStores()
  const pal = usePalette('default')
  const safeAreaInsets = useSafeAreaInsets()
  const {footerMinimalShellTransform} = useMinimalShellMode()

  return (
    <Animated.View
      style={[
        styles.bottomBar,
        pal.view,
        pal.border,
        {paddingBottom: clamp(safeAreaInsets.bottom, 15, 30)},
        footerMinimalShellTransform,
      ]}>
      <NavItem routeName="(index)" href="/">
        {isActive => {
          const Icon = isActive ? HomeIconSolid : HomeIcon
          return (
            <Icon
              strokeWidth={4}
              size={24}
              style={[pal.text, styles.homeIcon]}
            />
          )
        }}
      </NavItem>
      <NavItem routeName="(search)" href="/search">
        {isActive => {
          const Icon = isActive
            ? MagnifyingGlassIcon2Solid
            : MagnifyingGlassIcon2
          return (
            <Icon
              size={25}
              style={[pal.text, styles.searchIcon]}
              strokeWidth={1.8}
            />
          )
        }}
      </NavItem>
      <NavItem routeName="(notifications)" href="/notifications">
        {isActive => {
          const Icon = isActive ? BellIconSolid : BellIcon
          return (
            <Icon
              size={24}
              strokeWidth={1.9}
              style={[pal.text, styles.bellIcon]}
            />
          )
        }}
      </NavItem>
      <NavItem routeName="(profile)" href={`/profile/${store.me.handle}`}>
        {() => (
          <UserIcon
            size={28}
            strokeWidth={1.5}
            style={[pal.text, styles.profileIcon]}
          />
        )}
      </NavItem>
    </Animated.View>
  )
})

const NavItem: React.FC<{
  children: (isFocused: boolean) => React.ReactChild
  href: string
  routeName: string
}> = ({children, routeName}) => {
  return (
    <TabLink
      name={routeName}
      style={[
        styles.ctrl,
        {alignItems: 'center', display: 'flex', justifyContent: 'center'},
      ]}>
      {children}
    </TabLink>
  )
}
