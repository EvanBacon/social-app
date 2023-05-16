import React from 'react'
import {SearchUIModel} from 'state/models/ui/search'
import {FoafsModel} from 'state/models/discovery/foafs'
import {SuggestedActorsModel} from 'state/models/discovery/suggested-actors'
import {withAuthRequired} from 'view/com/auth/withAuthRequired'
import {Suggestions} from 'view/com/search/Suggestions'
import {SearchResults} from 'view/com/search/SearchResults'
import {observer} from 'mobx-react-lite'
import {useStores} from 'state/index'
import * as Mobile from './SearchMobile'
import {useWebMediaQueries} from 'lib/hooks/useWebMediaQueries'
import {useLocalSearchParams} from 'expo-router'

export const SearchScreen = withAuthRequired(
  observer(() => {
    const store = useStores()
    const params = useLocalSearchParams<{q?: string}>()
    const foafs = React.useMemo<FoafsModel>(
      () => new FoafsModel(store),
      [store],
    )
    const suggestedActors = React.useMemo<SuggestedActorsModel>(
      () => new SuggestedActorsModel(store),
      [store],
    )
    const searchUIModel = React.useMemo<SearchUIModel | undefined>(
      () => (params.q ? new SearchUIModel(store) : undefined),
      [params.q, store],
    )

    React.useEffect(() => {
      if (params.q && searchUIModel) {
        searchUIModel.fetch(params.q)
      }
      if (!foafs.hasData) {
        foafs.fetch()
      }
      if (!suggestedActors.hasLoaded) {
        suggestedActors.loadMore(true)
      }
    }, [foafs, suggestedActors, searchUIModel, params.q])

    if (searchUIModel) {
      return <SearchResults model={searchUIModel} />
    }

    const {isDesktop} = useWebMediaQueries()

    if (!isDesktop) {
      return <Mobile.SearchScreen />
    }

    return <Suggestions foafs={foafs} suggestedActors={suggestedActors} />
  }),
)
