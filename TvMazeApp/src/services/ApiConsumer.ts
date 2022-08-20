import useSWRInfinite from 'swr/infinite'

const axios = require('axios').default
axios.defaults.baseURL = 'https://api.tvmaze.com'

const swrFetcher = url => axios.get(url).then(res => res.data)

export interface IShow {
  id: number
  name: string
  image: {
    medium: string
    original: string
  }
  summary: string
  schedule: {
    days: string[]
    time: string
  }
}

export interface IUseShowAPIResponse {
  showsPages: IShow[][]
  currentPages: number
  setPages: Function
  isLoading: boolean
  isError: boolean
}

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

  return {
    showsPages: data,
    currentPages: size,
    setPages: setSize,
    isLoading: !error && !data,
    isError: error,
  }
}
