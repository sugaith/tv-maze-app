import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import {
  IEpisode,
  IUseSearchShowAPIResponse,
  IUseShowAPIResponse,
  IUseShowEpisodesAPIResponse,
} from './types'

const axios = require('axios').default
axios.defaults.baseURL = 'https://api.tvmaze.com'
const swrFetcher = url => axios.get(url).then(res => res.data)

export function useShowsAPI(): IUseShowAPIResponse {
  const showsPagination = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null
    }
    return `/shows?page=${pageIndex}`
  }

  const {data, error, size, setSize} = useSWRInfinite(
    showsPagination,
    swrFetcher,
    {initialSize: 1},
  )

  console.log('useShowsAPI', data?.length)
  return {
    showsPages: data || [],
    currentPages: size,
    setPages: setSize,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useShowsDetailsAPI(
  showId: number,
): IUseShowEpisodesAPIResponse {
  const swrKey = showId ? `/shows/${showId}/episodes?specials=1` : null
  const {data: episodes, error} = useSWR(swrKey, swrFetcher)

  const episodesBySeason = []
  episodes?.forEach((episode: IEpisode) => {
    episodesBySeason[episode.season] = episodesBySeason[episode.season]
      ? [...episodesBySeason[episode.season], episode]
      : [episode]
  })

  console.log('outLineDetails', episodesBySeason?.length)
  return {
    episodesBySeason: episodes ? episodesBySeason : [],
    isLoading: !error && !episodes,
    isError: error,
  }
}

export function useSearchAPI(
  searchTern: string,
  shouldSearch: boolean,
): IUseSearchShowAPIResponse {
  const swrKey = shouldSearch ? `/search/shows?q=${searchTern || 'some'}` : null
  const {data, error} = useSWR(swrKey, swrFetcher)

  const outLineShows = data?.map?.(({show}) => ({...show}))

  console.log('useSearch', outLineShows?.length)
  return {
    searchResults: outLineShows || [],
    isLoading: !error && !data,
    isError: error,
  }
}
