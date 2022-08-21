export interface IEpisode {
  id: number
  name: string
  season: number
  number: number
  summary: string
  image: {
    medium: string
    original: string
  }
}

export interface IShow {
  id: number
  name: string
  image: {
    medium: string
    original: string
  }
  genres: string[]
  summary: string
  schedule: {
    days: string[]
    time: string
  }
  episodes: IEpisode[]
}

export interface IUseShowAPIResponse {
  showsPages: IShow[][]
  currentPages: number
  setPages: Function
  isLoading: boolean
  isError: boolean
}

export interface IUseSearchShowAPIResponse {
  searchResults: IShow[][]
  isLoading: boolean
  isError: boolean
}

export interface IUseShowEpisodesAPIResponse {
  episodesBySeason: IEpisode[][]
  isLoading: boolean
  isError: boolean
}
