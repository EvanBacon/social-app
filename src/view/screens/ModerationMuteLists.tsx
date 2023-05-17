import React from 'react'
import {StyleSheet} from 'react-native'
import {useFocusEffect} from 'expo-router'
import {
  FontAwesomeIcon,
  FontAwesomeIconStyle,
} from '@fortawesome/react-native-fontawesome'
import {AtUri} from '@atproto/api'
import {withAuthRequired} from 'view/com/auth/withAuthRequired'
import {EmptyStateWithButton} from 'view/com/util/EmptyStateWithButton'
import {useStores} from 'state/index'
import {ListsListModel} from 'state/models/lists/lists-list'
import {ListsList} from 'view/com/lists/ListsList'
import {Button} from 'view/com/util/forms/Button'
import {usePalette} from 'lib/hooks/usePalette'
import {CenteredView} from 'view/com/util/Views'
import {ViewHeader} from 'view/com/util/ViewHeader'
import {isDesktopWeb} from 'platform/detection'
import {useRouter} from 'expo-router'

export const ModerationMuteListsScreen = withAuthRequired(() => {
  const pal = usePalette('default')
  const store = useStores()
  const router = useRouter()

  const mutelists: ListsListModel = React.useMemo(
    () => new ListsListModel(store, 'my-modlists'),
    [store],
  )

  useFocusEffect(
    React.useCallback(() => {
      store.shell.setMinimalShellMode(false)
      mutelists.refresh()
    }, [store, mutelists]),
  )

  const onPressNewMuteList = React.useCallback(() => {
    store.shell.openModal({
      name: 'create-or-edit-mute-list',
      onSave: (uri: string) => {
        try {
          const urip = new AtUri(uri)
          router.push({
            pathname: '../profile/[name]/lists/[rkey]',
            params: {
              name: urip.hostname,
              rkey: urip.rkey,
            },
          })
        } catch {}
      },
    })
  }, [store, router])

  const renderEmptyState = React.useCallback(() => {
    return (
      <EmptyStateWithButton
        testID="emptyMuteLists"
        icon="users-slash"
        message="You can subscribe to mute lists to automatically mute all of the users they include. Mute lists are public but your subscription to a mute list is private."
        buttonLabel="New Mute List"
        onPress={onPressNewMuteList}
      />
    )
  }, [onPressNewMuteList])

  const renderHeaderButton = React.useCallback(
    () => (
      <Button
        type="primary-light"
        onPress={onPressNewMuteList}
        style={styles.createBtn}>
        <FontAwesomeIcon
          icon="plus"
          style={pal.link as FontAwesomeIconStyle}
          size={18}
        />
      </Button>
    ),
    [onPressNewMuteList, pal],
  )

  return (
    <CenteredView
      style={[
        styles.container,
        isDesktopWeb && styles.containerDesktop,
        pal.view,
        pal.border,
      ]}
      testID="moderationMutelistsScreen">
      <ViewHeader
        title="Mute Lists"
        showOnDesktop
        renderButton={renderHeaderButton}
      />
      <ListsList
        listsList={mutelists}
        showAddBtns={isDesktopWeb}
        renderEmptyState={renderEmptyState}
        onPressCreateNew={onPressNewMuteList}
      />
    </CenteredView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: isDesktopWeb ? 0 : 100,
  },
  containerDesktop: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  createBtn: {
    width: 40,
  },
})
