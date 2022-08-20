import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'
import {IUseShowAPIResponse} from './types'

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

export function useSearch(searchTern: string, shouldSearch: boolean) {
  const {data, error} = useSWR(
    shouldSearch ? `/search/shows?q=${searchTern || 'some'}` : null,
    swrFetcher,
    {
      refreshInterval: 1500,
      dedupingInterval: 1500,
    },
  )

  const outLineShows = data?.map?.(({show}) => ({...show}))

  console.log('useSearch', outLineShows?.length)
  return {
    searchResults: outLineShows || [],
    isLoading: !error && !data,
    isError: error,
  }
}
