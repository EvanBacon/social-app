import {Slot, Tabs} from 'expo-router'
import React from 'react'
import {Shell} from 'view/shell'
import {BottomBar} from 'view/shell/bottom-bar/BottomBar'
import TabbedSlot, {TabbedNavigator} from 'view/shell/bottom-bar/tab-slot'

export const unstable_settings = {
  initialRouteName: '(index)',
}
export default function Layout() {
  return <Shell />
  //   return (
  //     // <TabbedNavigator>
  //     //   <Inner />
  //     // </TabbedNavigator>
  //     // <Tabs
  //     //   tabBar={tabBar}
  //     //   backBehavior="initialRoute"
  //     //   screenOptions={{
  //     //     headerShown: false,
  //     //   }}
  //     // />
  //   )
}

// function Inner() {
//   const tabBar = React.useCallback(props => <BottomBar {...props} />, [])

//   return (
//     <>
//       <TabbedSlot />
//       {tabBar}
//     </>
//   )
// }
